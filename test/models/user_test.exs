defmodule Rumbl.UserTest do
  use Rumbl.ModelCase, async: true
  alias Rumbl.User

  @valid_attrs %{name: "A User", username: "eva", password: "secret"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)

    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)

    refute changeset.valid?
  end

  test "registration_changeset password must be at least 6 chars long" do
    attrs = %{@valid_attrs | password: "no"}
    changeset = User.registration_changeset(%User{}, attrs)

    refute changeset.valid?
    assert {:password, {"should be at least %{count} character(s)", count: 6}}
      in changeset.errors
  end

  test "registration_changeset with valid attributes hashes password" do
    attrs = %{@valid_attrs | password: "superstrong"}
    changeset = User.registration_changeset(%User{}, attrs)
    %{password: pass, password_hash: pass_hash} = changeset.changes

    assert changeset.valid?
    assert pass_hash
    assert Comeonin.Bcrypt.checkpw(pass, pass_hash)
  end
end
