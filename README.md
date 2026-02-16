# Network

This project is an implementation of a social network website for making posts and following users, built using Django and JavaScript.

## 🔍 Overview

This web application allows users to:

* Post text-based updates to a global feed.
* Follow and unfollow other users to customize their feed.
* "Like" and "Unlike" posts dynamically.
* Edit their own posts without reloading the page.
* View detailed user profiles with follower and following counts.
* Navigate through posts using a server-side pagination system.

## ➡️ Getting Started

⚙️ To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/saidbaraou/network.git](https://github.com/saidbaraou/network.git)
    cd network
    ```

2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On macOS and Linux
    # venv\Scripts\activate  # On Windows
    ```

3.  **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Make migrations:**
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

5.  **Create a superuser (for admin access):**
    ```bash
    python manage.py createsuperuser
    ```

6.  **Run the development server:**
    ```bash
    python manage.py runserver
    ```

7.  **Open your web browser and navigate to `http://127.0.0.1:8000/` to view the application.**

## ✨ Features

* **All Posts:** A feed showing all posts from all users, ordered by newest first.
* **Following Feed:** A dedicated view showing only posts from users the current user follows.
* **Profile Page:** Displays a user's post history, follower count, and following count.
* **Edit Post:** Inline editing functionality using JavaScript and the Fetch API.
* **Like System:** Asynchronous like/unlike toggle with real-time counter updates.
* **Pagination:** Efficiently displays 10 posts per page to improve performance.
* **Data Integrity:** Database-level constraints to ensure a user can only like a post once.

## 🛠️ Technologies Used

![image](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![image](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![image](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![image](https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

## ➕ Further Development

This project could be further enhanced with features such as:

* Image and video upload support for posts.
* Direct messaging system between users.
* Real-time notifications for likes and new followers.
* Hashtag support and trending topic discovery.
* Dark mode and customizable user themes.
