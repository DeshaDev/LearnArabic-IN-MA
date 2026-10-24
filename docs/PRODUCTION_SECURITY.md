# Production security and deployment notes

## Account sessions

- New registrations require a password of at least 12 characters. Existing accounts may continue to sign in with their current password.
- The server stores only a SHA-256 hash of each session token, expires sessions after 30 days, and removes the current session when a learner signs out.
- Authentication, contact submissions, and teacher-review submissions have per-process rate limits. The limits are intentionally conservative for the current MVP.

## Reverse proxies and rate limits

- `TRUST_PROXY_HOPS` defaults to `0`, so Express does not trust forwarded client-IP headers by default.
- Set it only when the deployment topology is known. For exactly one trusted reverse proxy, use `1`; do not blindly enable proxy trust on a directly exposed server.
- The rate limiter uses the IP address Express resolves. It is held in memory, so each application process has its own counters.

## Teacher-review queue access

- Learners must be signed in to read their own saved requests.
- To allow a designated staff account to view the whole queue, set `ADMIN_EMAILS` to a comma-separated list of **registered account email addresses**. Leave it blank when no staff queue access is configured.
- Public submissions do not expose the internal account ID in the response. Notes remain sensitive learner data; only configured staff should receive queue access.

## Runtime data and scaling

- The runtime learner database is created under `data/faham_ayat_db.json` only when the server needs it. The directory is ignored by Git; do not commit database files or secrets.
- Writes use a temporary file and atomic rename, and the database file is restricted to owner read/write where the host filesystem supports POSIX permissions. A malformed database is not replaced automatically with an empty database; restore a trusted backup after investigating.
- This JSON store and the in-memory rate limits are suitable only for a **single application process**. Before running multiple replicas or handling substantial production traffic, migrate learner data to a transactional shared database and rate limits to a shared store.

## External delivery

- Contact forms and teacher-review requests are recorded by the application; this code does not itself send email or automatically assign a teacher. Keep the user-facing wording transparent about that limitation.
- Set `APP_URL` to the public HTTPS origin in production so canonical and Open Graph URLs are not generated with the localhost fallback.
