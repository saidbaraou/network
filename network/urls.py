
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("post/create", views.post_view, name="post_view"),
    path("profile/<str:username>/", views.profile_view, name="profile"),
    path("profile/<str:username>/toggle_follow", views.toggle_follow, name="toggle_follow"),
    path("following", views.following_view, name="following_view"),
]
