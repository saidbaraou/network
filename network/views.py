from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.core.paginator import Paginator

from .models import User, Post


def index(request):
    posts = Post.objects.all().order_by("-timestamp")
    
    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page')
    page_posts = paginator.get_page(page_number)

    return render(request, "network/index.html", {
        "page_posts": page_posts
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
    

@login_required    
def post_view(request):
    if request.method == "POST":
        content = request.POST.get("content")

        if content:
            new_post = Post(
                author=request.user,
                content=content
            )
            new_post.save()
    return redirect(reverse("index"))

def profile_view(request, username):
    user_profile = get_object_or_404(User, username=username)
    posts = Post.objects.filter(author=request.user).order_by("-timestamp")

    is_following = False
    if request.user.is_authenticated:
        if request.user.following.filter(pk=user_profile.pk).exists():
            is_following = True

    return render(request, "network/profile-page.html", {
        "user_profile": user_profile,
        "posts": posts,
        "follower_count": user_profile.followers.count(),
        "following_count": user_profile.following.count(),
        "is_following": is_following
    })

@login_required
def toggle_follow(request, username):
    user_to_modify = get_object_or_404(User, username=username)

    if request.user != user_to_modify:
        if request.user.following.filter(pk=user_to_modify.pk).exists():
            request.user.following.remove(user_to_modify)
        else:
            request.user.following.add(user_to_modify)

    return redirect("profile", username=username)

@login_required
def following_view(request):
    followed_users = request.user.following.all()
    #Get posts where author is in followed_users
    posts = Post.objects.filter(author__in=followed_users).order_by("-timestamp")

    return render(request, "network/following.html", {
        "posts": posts
    })

