# Rumbl

This is the sample app from the [Programming Phoenix][0] book. It includes

* User authentication
* Web sockets using phoenix channels
* Integration with Wolfram alpha
* Playback of comments while watching a video

The app has also been modified to run on heroku at
https://ar-rumbl.herokuapp.com.

## Deployment

The following environment variables need to be set when running in production

    DATABASE_URL
    SECRET_KEY_BASE
    WOLFRAM_APP_ID


To start your Phoenix app:

  1. Install dependencies with `mix deps.get`
  2. Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  3. Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: http://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix

[0]: https://pragprog.com/book/phoenix/programming-phoenix
