# tystie - a database migration framework

`tystie` is a database migration framework designed for integration into your
Node applications. It's designed to run within your application, rather than as
an external tool; this means that, if your project is configured correctly (e.g.
with `esbuild` bundling) you should be able to distribute an application with no
external dependencies. Depending on your driver, this may mean that your users
can run your application without running `npm install`--this is the case with
`node-sqlite3-wasm` and the `tystie-sqlite3-wasm` driver.

## Prior Art

Parts of the design of this project are heavily inspired by
[`node-db-migrate`][ndb] and [flyway][flyway]. If this project doesn't suit your
needs, check them out; they provide their own unique takes on migration that may
work better for you.

<!-->
## References
<-->

[ndb]: https://github.com/db-migrate/node-db-migrate
[flyway]: https://flywaydb.org/
