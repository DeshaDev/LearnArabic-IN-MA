import {
  LearnerProgress,
  LocalizedText,
  SkillMetric,
  WordToken,
  WorldLocationId,
  WorldMistakeEntry,
  WorldProgressState,
  WorldSkillId,
} from '../types/learning';
import {
  MARKET_INVENTORY,
  MarketMissionStage,
  SceneLabStage,
  SentenceBridgeChallenge,
  StreetExplorerLevel,
  WORLD_LOCATIONS,
} from '../data/worldData';
import { calculateNextReview } from './learningEngine';

export function createInitialWorldProgress(): WorldProgressState {
  return {
    xp: 0,
    totalStars: 0,
    unlockedLocations: [
      'street-explorer',
      'scene-lab',
      'market',
      'sentence-bridge',
      'lost-message',
      'word-detective',
      'quranic-discovery',
    ],
    completedLevels: {},
    skillDemonstrations: {
      'word-recognition': 0,
      'vocabulary-comprehension': 0,
      'spatial-language': 0,
      'following-instructions': 0,
      'listening-comprehension': 0,
      'sentence-comprehension': 0,
      'basic-grammar': 0,
      'morphology-roots': 0,
      'quranic-vocabulary': 0,
    },
    mistakeHistory: [],
  };
}

export function createDemoWorldProgress(nowTimestamp: number): WorldProgressState {
  return {
    xp: 280,
    totalStars: 9,
    unlockedLocations: [
      'street-explorer',
      'scene-lab',
      'market',
      'sentence-bridge',
      'lost-message',
      'word-detective',
      'quranic-discovery',
    ],
    completedLevels: {
      'street-explorer:1': {
        locationId: 'street-explorer',
        levelNumber: 1,
        stars: 3,
        bestScore: 100,
        attempts: 1,
        mistakesCount: 0,
        completedAt: nowTimestamp - 7200_000,
      },
      'scene-lab:1': {
        locationId: 'scene-lab',
        levelNumber: 1,
        stars: 3,
        bestScore: 100,
        attempts: 1,
        mistakesCount: 0,
        completedAt: nowTimestamp - 5400_000,
      },
      'market:1': {
        locationId: 'market',
        levelNumber: 1,
        stars: 3,
        bestScore: 100,
        attempts: 1,
        mistakesCount: 0,
        completedAt: nowTimestamp - 3600_000,
      },
    },
    skillDemonstrations: {
      'word-recognition': 4,
      'vocabulary-comprehension': 4,
      'spatial-language': 3,
      'following-instructions': 3,
      'listening-comprehension': 2,
      'sentence-comprehension': 3,
      'basic-grammar': 2,
      'morphology-roots': 2,
      'quranic-vocabulary': 4,
    },
    mistakeHistory: [],
    lastPlayedLocation: 'street-explorer',
  };
}

// ============================================================================
// 1. STREET EXPLORER PURE ENGINE
// ============================================================================
export type DirectionMove = 'up' | 'down' | 'left' | 'right';

export interface StreetExplorerStepOutcome {
  nextPos: { x: number; y: number };
  hitObstacle: boolean;
  reachedIntermediate: boolean;
  reachedTarget: boolean;
  wrongLandmarkReached?: string;
  arabicDirectionUsed: string;
  feedback?: LocalizedText;
}

export function stepStreetExplorer(
  level: StreetExplorerLevel,
  currentPos: { x: number; y: number },
  move: DirectionMove,
  hasPassedIntermediate: boolean,
  gridSize = 5
): StreetExplorerStepOutcome {
  const delta = {
    up: { dx: 0, dy: -1, arabic: 'أَمَامَ (Utara / Depan)' },
    down: { dx: 0, dy: 1, arabic: 'خَلْفَ (Selatan / Belakang)' },
    left: { dx: -1, dy: 0, arabic: 'يَسَارًا (Kiri / Barat)' },
    right: { dx: 1, dy: 0, arabic: 'يَمِينًا (Kanan / Timur)' },
  }[move];

  const candidateX = currentPos.x + delta.dx;
  const candidateY = currentPos.y + delta.dy;

  if (
    candidateX < 0 ||
    candidateX >= gridSize ||
    candidateY < 0 ||
    candidateY >= gridSize
  ) {
    return {
      nextPos: currentPos,
      hitObstacle: true,
      reachedIntermediate: hasPassedIntermediate,
      reachedTarget: false,
      arabicDirectionUsed: delta.arabic,
      feedback: {
        'id-ID': 'Batas jalan lingkungan tercapai. Perhatikan kembali petunjuk arah bahasa Arab di atas.',
        'ms-MY': 'Sempadan jalan kejiranan dicapai. Perhatikan semula petunjuk arah bahasa Arab di atas.',
      },
    };
  }

  const isBlocked = level.blockedCoords.some(
    (b) => b.x === candidateX && b.y === candidateY
  );
  if (isBlocked) {
    return {
      nextPos: currentPos,
      hitObstacle: true,
      reachedIntermediate: hasPassedIntermediate,
      reachedTarget: false,
      arabicDirectionUsed: delta.arabic,
      feedback: {
        'id-ID': 'Jalan ini terhalang bangunan atau pagar. Gunakan jalur jalan utama yang terbuka.',
        'ms-MY': 'Jalan ini terhalang oleh bangunan atau pagar. Gunakan laluan jalan utama yang terbuka.',
      },
    };
  }

  const nextPos = { x: candidateX, y: candidateY };
  const nowPassedIntermediate =
    hasPassedIntermediate ||
    !level.requiredIntermediatePos ||
    (nextPos.x === level.requiredIntermediatePos.x &&
      nextPos.y === level.requiredIntermediatePos.y);

  const isAtTarget =
    nextPos.x === level.targetPos.x && nextPos.y === level.targetPos.y;

  if (isAtTarget && !nowPassedIntermediate) {
    return {
      nextPos,
      hitObstacle: false,
      reachedIntermediate: false,
      reachedTarget: false,
      arabicDirectionUsed: delta.arabic,
      feedback: {
        'id-ID':
          'Anda tiba di tujuan akhir, tetapi belum melewati titik persimpangan sesuai urutan instruksi (تَقَدَّمْ ... ثُمَّ ...). Ikuti urutan langkah dari awal!',
        'ms-MY':
          'Anda tiba di destinasi akhir, tetapi belum melalui titik persimpangan mengikut urutan arahan (تَقَدَّمْ ... ثُمَّ ...). Ikuti urutan langkah dari awal!',
      },
    };
  }

  if (isAtTarget && nowPassedIntermediate) {
    return {
      nextPos,
      hitObstacle: false,
      reachedIntermediate: true,
      reachedTarget: true,
      arabicDirectionUsed: delta.arabic,
      feedback: level.successExplanation,
    };
  }

  // Check if player stepped onto a distractor landmark
  const steppedLandmark = level.landmarks.find(
    (lm) => lm.x === nextPos.x && lm.y === nextPos.y
  );
  if (steppedLandmark) {
    return {
      nextPos,
      hitObstacle: false,
      reachedIntermediate: nowPassedIntermediate,
      reachedTarget: false,
      wrongLandmarkReached: steppedLandmark.arabicLabel,
      arabicDirectionUsed: delta.arabic,
      feedback: {
        'id-ID': `Anda berada di ${steppedLandmark.arabicLabel} (${steppedLandmark.label['id-ID']}). Periksa kembali apakah ini tujuan yang diminta pada instruksi!`,
        'ms-MY': `Anda berada di ${steppedLandmark.arabicLabel} (${steppedLandmark.label['ms-MY']}). Semak semula sama ada ini destinasi yang diminta dalam arahan!`,
      },
    };
  }

  return {
    nextPos,
    hitObstacle: false,
    reachedIntermediate: nowPassedIntermediate,
    reachedTarget: false,
    arabicDirectionUsed: delta.arabic,
  };
}

// ============================================================================
// 2. SCENE LAB PURE EVALUATOR
// ============================================================================
export interface SceneLabEvaluation {
  isCorrect: boolean;
  feedback: LocalizedText;
}

export function evaluateSceneLabAttempt(
  stage: SceneLabStage,
  selectedId: string
): SceneLabEvaluation {
  if (stage.mode === 'place-object-in-scene' && stage.placementZones) {
    const zone = stage.placementZones.find((z) => z.zoneId === selectedId);
    if (!zone) {
      return {
        isCorrect: false,
        feedback: {
          'id-ID': 'Pilih salah satu zona penempatan di dalam adegan.',
          'ms-MY': 'Pilih salah satu zon penempatan di dalam adegan.',
        },
      };
    }
    if (zone.isCorrectZone) {
      return {
        isCorrect: true,
        feedback: {
          'id-ID': `Sangat tepat! Anda menempatkan الْكِتَاب pada zona ${zone.arabicZoneLabel} (${zone.label['id-ID']}) sesuai bunyi kalimat.`,
          'ms-MY': `Sangat tepat! Anda menempatkan الْكِتَاب pada zon ${zone.arabicZoneLabel} (${zone.label['ms-MY']}) bertepatan dengan bunyi ayat.`,
        },
      };
    }
    return {
      isCorrect: false,
      feedback: {
        'id-ID': `Belum tepat: Zona yang Anda pilih adalah ${zone.arabicZoneLabel} (${zone.label['id-ID']}), sedangkan instruksi meminta تَحْتَ الطَّاوِلَةِ (di bawah meja).`,
        'ms-MY': `Belum tepat: Zon yang anda pilih ialah ${zone.arabicZoneLabel} (${zone.label['ms-MY']}), sedangkan arahan meminta تَحْتَ الطَّاوِلَةِ (di bawah meja).`,
      },
    };
  }

  const chosen = stage.options.find((o) => o.id === selectedId);
  if (!chosen) {
    return {
      isCorrect: false,
      feedback: {
        'id-ID': 'Pilih salah satu kalimat bahasa Arab.',
        'ms-MY': 'Pilih salah satu ayat bahasa Arab.',
      },
    };
  }

  return {
    isCorrect: chosen.isCorrect,
    feedback: chosen.diagnosticFeedback,
  };
}

// ============================================================================
// 3. MARKET MISSION BASKET EVALUATOR
// ============================================================================
export interface MarketOrderEvaluation {
  isCorrect: boolean;
  diagnosticCategory: 'comprehension' | 'quantity-dual' | 'color-adjective';
  feedback: LocalizedText;
}

export function evaluateMarketOrder(
  stage: MarketMissionStage,
  basket: Record<string, number>
): MarketOrderEvaluation {
  const nonZeroBasketEntries = Object.entries(basket).filter(([, qty]) => qty > 0);
  const expectedEntries = Object.entries(stage.expectedBasket).filter(
    ([, qty]) => qty > 0
  );

  if (nonZeroBasketEntries.length === 0) {
    return {
      isCorrect: false,
      diagnosticCategory: 'comprehension',
      feedback: {
        'id-ID': 'Keranjang masih kosong. Klik barang di rak pasar untuk memasukkannya ke keranjang.',
        'ms-MY': 'Bakul masih kosong. Klik barang di rak pasar untuk memasukkannya ke dalam bakul.',
      },
    };
  }

  // Check if exact match
  const isExactMatch =
    nonZeroBasketEntries.length === expectedEntries.length &&
    expectedEntries.every(([itemId, expectedQty]) => basket[itemId] === expectedQty);

  if (isExactMatch) {
    return {
      isCorrect: true,
      diagnosticCategory: 'comprehension',
      feedback: {
        'id-ID': `Pesanan sempurna! Anda memahami jenis barang, sifat warna, dan jumlah pada permintaan «${stage.arabicRequest}».`,
        'ms-MY': `Pesanan sempurna! Anda memahami jenis barang, sifat warna dan bilangan pada permintaan «${stage.arabicRequest}».`,
      },
    };
  }

  // Diagnose specific mistake: right product type, wrong color vs right item, wrong quantity/dual
  for (const [expectedItemId, expectedQty] of expectedEntries) {
    const actualQty = basket[expectedItemId] || 0;
    const expectedProduct = MARKET_INVENTORY.find((p) => p.id === expectedItemId);

    if (actualQty > 0 && actualQty !== expectedQty) {
      return {
        isCorrect: false,
        diagnosticCategory: 'quantity-dual',
        feedback: {
          'id-ID': `Jenis barang (${expectedProduct?.name['id-ID']}) sudah benar, tetapi jumlahnya ${actualQty} (seharusnya ${expectedQty}). ${stage.grammarHint['id-ID']}`,
          'ms-MY': `Jenis barang (${expectedProduct?.name['ms-MY']}) sudah betul, tetapi bilangannya ${actualQty} (sepatutnya ${expectedQty}). ${stage.grammarHint['ms-MY']}`,
        },
      };
    }

    if (actualQty === 0 && expectedProduct) {
      const sameTypeWrongColor = nonZeroBasketEntries.find(([chosenId]) => {
        const chosenProd = MARKET_INVENTORY.find((p) => p.id === chosenId);
        return (
          chosenProd &&
          chosenProd.productType === expectedProduct.productType &&
          chosenProd.id !== expectedProduct.id
        );
      });

      if (sameTypeWrongColor) {
        return {
          isCorrect: false,
          diagnosticCategory: 'color-adjective',
          feedback: {
            'id-ID': `Anda memilih jenis barang yang mendekati, tetapi warna/ukurannya berbeda! Pelanggan meminta ${expectedProduct.name['id-ID']} (${expectedProduct.arabicSingular}).`,
            'ms-MY': `Anda memilih jenis barang yang hampir sama, tetapi warna/saiznya berbeza! Pelanggan meminta ${expectedProduct.name['ms-MY']} (${expectedProduct.arabicSingular}).`,
          },
        };
      }
    }
  }

  return {
    isCorrect: false,
    diagnosticCategory: 'comprehension',
    feedback: {
      'id-ID': `Isi keranjang belum sesuai dengan pesanan «${stage.arabicRequest}». Petunjuk: ${stage.grammarHint['id-ID']}`,
      'ms-MY': `Isi bakul belum bertepatan dengan pesanan «${stage.arabicRequest}». Petunjuk: ${stage.grammarHint['ms-MY']}`,
    },
  };
}

// ============================================================================
// 4. SENTENCE BRIDGE MULTI-ORDER VALIDATOR
// ============================================================================
export interface SentenceBridgeEvaluation {
  isCorrect: boolean;
  matchedOrderIndex: number;
  feedback: LocalizedText;
}

export function evaluateSentenceBridge(
  challenge: SentenceBridgeChallenge,
  selectedTileIds: string[]
): SentenceBridgeEvaluation {
  if (selectedTileIds.length < challenge.availableTiles.length) {
    return {
      isCorrect: false,
      matchedOrderIndex: -1,
      feedback: {
        'id-ID': 'Susun seluruh kepingan kata terlebih dahulu untuk menyambungkan jembatan.',
        'ms-MY': 'Susun kesemua kepingan perkataan terlebih dahulu untuk menyambungkan jambatan.',
      },
    };
  }

  const matchedIndex = challenge.validOrders.findIndex(
    (validSeq) =>
      validSeq.length === selectedTileIds.length &&
      validSeq.every((tileId, idx) => tileId === selectedTileIds[idx])
  );

  if (matchedIndex !== -1) {
    return {
      isCorrect: true,
      matchedOrderIndex: matchedIndex,
      feedback: challenge.grammarExplanation,
    };
  }

  return {
    isCorrect: false,
    matchedOrderIndex: -1,
    feedback: {
      'id-ID': `Urutan kata belum membentuk kalimat yang tepat untuk arti ${challenge.targetMeaning['id-ID']}. Perhatikan peran kata kerja, pelaku (-u), objek (-a), atau kata depan!`,
      'ms-MY': `Susunan perkataan belum membentuk ayat yang tepat bagi maksud ${challenge.targetMeaning['ms-MY']}. Perhatikan peranan kata kerja, pelaku (-u), objek (-a) atau kata sendi!`,
    },
  };
}

// ============================================================================
// 5. SHARED PROGRESS & 9-SKILL MAP UPDATER
// ============================================================================
export interface GameCompletionPayload {
  locationId: WorldLocationId;
  levelNumber: number;
  wordIds: string[];
  mistakesCount: number;
  ArabicPrompt: string;
  diagnosticCategory?: WorldMistakeEntry['diagnosticCategory'];
  mistakeFeedback?: LocalizedText;
}

export function recordGameAttemptInProgress(
  progress: LearnerProgress,
  payload: GameCompletionPayload,
  didPassLevel: boolean,
  nowTimestamp: number
): LearnerProgress {
  const existingWorld = progress.worldProgress || createInitialWorldProgress();
  const locationMeta = WORLD_LOCATIONS.find((l) => l.id === payload.locationId);
  const levelKey = `${payload.locationId}:${payload.levelNumber}`;

  const updatedQueue = { ...progress.reviewQueue };

  if (didPassLevel) {
    // Mark focus words as learned and schedule spaced review
    payload.wordIds.forEach((wId) => {
      updatedQueue[wId] = calculateNextReview(
        updatedQueue[wId],
        wId,
        payload.mistakesCount === 0,
        nowTimestamp
      );
    });

    const earnedStars =
      payload.mistakesCount === 0 ? 3 : payload.mistakesCount === 1 ? 2 : 1;
    const prevResult = existingWorld.completedLevels[levelKey];
    const bestStars = prevResult
      ? Math.max(prevResult.stars, earnedStars)
      : earnedStars;
    const starDelta = prevResult ? Math.max(0, bestStars - prevResult.stars) : earnedStars;
    const xpGain = prevResult ? 15 : 40 + earnedStars * 10;

    const updatedSkills = { ...existingWorld.skillDemonstrations };
    if (locationMeta) {
      locationMeta.skillsTrained.forEach((skillId) => {
        updatedSkills[skillId] = (updatedSkills[skillId] || 0) + 1;
      });
    }

    const learnedWordIds = Array.from(
      new Set([...progress.learnedWordIds, ...payload.wordIds])
    );

    return {
      ...progress,
      learnedWordIds,
      reviewQueue: updatedQueue,
      worldProgress: {
        ...existingWorld,
        xp: existingWorld.xp + xpGain,
        totalStars: existingWorld.totalStars + starDelta,
        completedLevels: {
          ...existingWorld.completedLevels,
          [levelKey]: {
            locationId: payload.locationId,
            levelNumber: payload.levelNumber,
            stars: bestStars,
            bestScore: Math.max(
              prevResult?.bestScore || 0,
              Math.max(60, 100 - payload.mistakesCount * 15)
            ),
            attempts: (prevResult?.attempts || 0) + 1,
            mistakesCount: payload.mistakesCount,
            completedAt: nowTimestamp,
          },
        },
        skillDemonstrations: updatedSkills,
        lastPlayedLocation: payload.locationId,
      },
      analyticsEvents: [
        ...(progress.analyticsEvents || []).slice(-49),
        {
          eventName: 'world_level_completed',
          timestamp: nowTimestamp,
          metadata: `${levelKey}:stars=${earnedStars}`,
        },
      ],
    };
  }

  // On mistake/retry: schedule the focus words for immediate review in ReviewCenterView
  payload.wordIds.forEach((wId) => {
    updatedQueue[wId] = calculateNextReview(
      updatedQueue[wId],
      wId,
      false,
      nowTimestamp
    );
  });

  const newMistake: WorldMistakeEntry = {
    id: `mistake-${nowTimestamp}`,
    locationId: payload.locationId,
    levelNumber: payload.levelNumber,
    wordId: payload.wordIds[0],
    arabicPrompt: payload.ArabicPrompt,
    diagnosticCategory: payload.diagnosticCategory || 'comprehension',
    feedback: payload.mistakeFeedback || {
      'id-ID': 'Perlu pengulangan pada konsep ini.',
      'ms-MY': 'Perlu pengulangan pada konsep ini.',
    },
    timestamp: nowTimestamp,
  };

  return {
    ...progress,
    reviewQueue: updatedQueue,
    worldProgress: {
      ...existingWorld,
      mistakeHistory: [newMistake, ...existingWorld.mistakeHistory].slice(0, 25),
      lastPlayedLocation: payload.locationId,
    },
    analyticsEvents: [
      ...(progress.analyticsEvents || []).slice(-49),
      {
        eventName: 'world_level_retry',
        timestamp: nowTimestamp,
        metadata: `${levelKey}:${newMistake.diagnosticCategory}`,
      },
    ],
  };
}

export function computeNineSkillMap(
  progress: LearnerProgress,
  allWords: WordToken[]
): SkillMetric[] {
  const wp = progress.worldProgress || createInitialWorldProgress();
  const learnedWords = allWords.filter((w) =>
    progress.learnedWordIds.includes(w.id)
  );
  const retainedCount = Object.values(progress.reviewQueue).filter(
    (item) => item.correctStreak >= 1
  ).length;
  const rootExploredCount = learnedWords.filter((w) => Boolean(w.rootFamily)).length;
  const quranicWordsCount = learnedWords.filter(
    (w) => !w.id.startsWith('w-world-')
  ).length;

  return [
    {
      id: 'word-recognition',
      label: {
        'id-ID': '1. Pengenalan Kata (Word Recognition)',
        'ms-MY': '1. Pengenalan Perkataan (Word Recognition)',
      },
      demonstratedCount: learnedWords.length + wp.skillDemonstrations['word-recognition'],
      targetCount: Math.max(12, allWords.length),
      evidenceDescription: {
        'id-ID': 'Mengenali bentuk kata Arab berharakat di pelajaran maupun tantangan Dunia Makna.',
        'ms-MY': 'Mengenali bentuk perkataan Arab berbaris dalam pelajaran mahupun cabaran Dunia Makna.',
      },
    },
    {
      id: 'vocabulary-comprehension',
      label: {
        'id-ID': '2. Pemahaman Kosakata (Vocabulary Comprehension)',
        'ms-MY': '2. Kefahaman Kosa Kata (Vocabulary Comprehension)',
      },
      demonstratedCount: retainedCount + wp.skillDemonstrations['vocabulary-comprehension'],
      targetCount: 15,
      evidenceDescription: {
        'id-ID': 'Memahami arti kata benda, warna, jumlah, dan sifat dalam konteks nyata.',
        'ms-MY': 'Memahami makna kata nama, warna, bilangan dan sifat dalam konteks sebenar.',
      },
    },
    {
      id: 'spatial-language',
      label: {
        'id-ID': '3. Bahasa Ruang & Arah (Spatial Language)',
        'ms-MY': '3. Bahasa Ruang & Arah (Spatial Language)',
      },
      demonstratedCount: wp.skillDemonstrations['spatial-language'],
      targetCount: 10,
      evidenceDescription: {
        'id-ID': 'Menguasai arah (يَمِين / يَسَار / أَمَام / خَلْف) dan posisi (فَوْق / تَحْت / بَيْن / بِجَانِب).',
        'ms-MY': 'Menguasai arah (يَمِين / يَسَار / أَمَام / خَلْف) dan kedudukan (فَوْق / تَحْت / بَيْن / بِجَانِب).',
      },
    },
    {
      id: 'following-instructions',
      label: {
        'id-ID': '4. Mengikuti Instruksi (Following Instructions)',
        'ms-MY': '4. Mengikuti Arahan (Following Instructions)',
      },
      demonstratedCount: wp.skillDemonstrations['following-instructions'],
      targetCount: 10,
      evidenceDescription: {
        'id-ID': 'Menjalankan perintah bertahap (تَقَدَّمْ، ثُمَّ اِنْعَطِفْ) di Penjelajah Jalan dan Pasar.',
        'ms-MY': 'Melaksanakan arahan berperingkat (تَقَدَّمْ، ثُمَّ اِنْعَطِفْ) di Penjelajah Jalan dan Pasar.',
      },
    },
    {
      id: 'listening-comprehension',
      label: {
        'id-ID': '5. Pemahaman Mendengar (Listening Comprehension)',
        'ms-MY': '5. Kefahaman Mendengar (Listening Comprehension)',
      },
      demonstratedCount:
        progress.completedLessonIds.length +
        wp.skillDemonstrations['listening-comprehension'],
      targetCount: 10,
      evidenceDescription: {
        'id-ID': 'Menangkap makna ucapan bahasa Arab dan lantunan ayat sebelum bertindak.',
        'ms-MY': 'Menangkap makna sebutan bahasa Arab dan bacaan ayat sebelum bertindak.',
      },
    },
    {
      id: 'sentence-comprehension',
      label: {
        'id-ID': '6. Pemahaman Kalimat Utuh (Sentence Comprehension)',
        'ms-MY': '6. Kefahaman Ayat Penuh (Sentence Comprehension)',
      },
      demonstratedCount:
        Object.keys(progress.lessonQuizScores).length +
        wp.skillDemonstrations['sentence-comprehension'],
      targetCount: 12,
      evidenceDescription: {
        'id-ID': 'Mencocokkan kalimat lengkap dengan adegan visual di Laboratorium Adegan & Pesan Hilang.',
        'ms-MY': 'Memadankan ayat lengkap dengan adegan visual di Makmal Adegan & Pesanan Hilang.',
      },
    },
    {
      id: 'basic-grammar',
      label: {
        'id-ID': '7. Tata Bahasa Terapan (Basic Grammar in Context)',
        'ms-MY': '7. Tatabahasa Terapan (Basic Grammar in Context)',
      },
      demonstratedCount: wp.skillDemonstrations['basic-grammar'],
      targetCount: 10,
      evidenceDescription: {
        'id-ID': 'Menyusun urutan kata (VSO/SVO) di Jembatan Kalimat & kesesuaian mutsanna (ـَيْنِ) di Pasar.',
        'ms-MY': 'Menyusun urutan perkataan (VSO/SVO) di Jambatan Ayat & kesesuaian mutsanna (ـَيْنِ) di Pasar.',
      },
    },
    {
      id: 'morphology-roots',
      label: {
        'id-ID': '8. Akar Kata & Morfologi (Morphology & Root Awareness)',
        'ms-MY': '8. Akar Perkataan & Morfologi (Morphology & Root Awareness)',
      },
      demonstratedCount:
        rootExploredCount + wp.skillDemonstrations['morphology-roots'],
      targetCount: 10,
      evidenceDescription: {
        'id-ID': 'Membedakan pola كَتَبَ / كِتَاب / كَاتِب / مَكْتُوب dan keluarga akar kata tiga huruf.',
        'ms-MY': 'Membezakan wazan كَتَبَ / كِتَاب / كَاتِب / مَكْتُوب dan keluarga akar perkataan tiga huruf.',
      },
    },
    {
      id: 'quranic-vocabulary',
      label: {
        'id-ID': '9. Kosakata Al-Qur’an & Bacaan Salat (Quranic Vocabulary)',
        'ms-MY': '9. Kosa Kata al-Quran & Bacaan Solat (Quranic Vocabulary)',
      },
      demonstratedCount:
        quranicWordsCount + wp.skillDemonstrations['quranic-vocabulary'],
      targetCount: 15,
      evidenceDescription: {
        'id-ID': 'Mentransfer kosakata dan struktur bahasa ke dalam pemahaman ayat Al-Qur’an terverifikasi.',
        'ms-MY': 'Memindahkan kosa kata dan struktur bahasa ke dalam kefahaman ayat al-Quran yang disahkan.',
      },
    },
  ];
}
