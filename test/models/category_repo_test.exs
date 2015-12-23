defmodule Rumbl.CategoryRepoTest do
  use Rumbl.ModelCase
  alias Rumbl.Category

  test "alphabetical/0 orders by name" do
    Repo.insert!(%Category{name: "c"})
    Repo.insert!(%Category{name: "a"})
    Repo.insert!(%Category{name: "b"})

    query = from c in Category.alphabetical, select: c.name
    first = from c in Category.alphabetical(query), limit: 1

    assert Repo.one(first) == "a"
    assert Repo.all(query) == ~w(a b c)
  end
end
