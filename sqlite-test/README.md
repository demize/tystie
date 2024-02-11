# sqlite-test

A mostly-separate project for manual testing of the SQLite driver. This is also
used so that we can test Typescript migrations; vitest doesn't seem to handle
those very well, so we need a separate project that can handle them better.
