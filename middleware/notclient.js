export default function({ store, redirect }) {
  if (store.state.auth.loggedIn) {
    let user = store.state.auth.user;
    if (
      user.user_type == "S" ||
      user.user_type == "P" ||
      user.is_superuser ||
      user.is_staff
    )
      return redirect("/");
  }
}
