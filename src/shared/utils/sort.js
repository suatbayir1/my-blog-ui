export const sortPosts = (posts, type) => {
    switch (type.key) {
        case "name-a-to-z":
            posts.sort(function (a, b) {
                return a.title.localeCompare(b.title);
            });
            return posts;
        case "name-z-to-a":
            posts.sort(function (a, b) {
                return b.title.localeCompare(a.title);
            });
            return posts;
        case "created-oldest":
            posts.sort(function (a, b) {
                return new Date(a.createdAt) - new Date(b.createdAt);
            });
            return posts;
        case "created-newest":
            posts.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            return posts;
        case "most-commented":
            posts.sort(function (a, b) {
                return a.length - b.length;
            });
            return posts;
        case "less-commented":
            posts.sort(function (a, b) {
                return b.length - a.length;
            });
            return posts;
        default:
            return posts;
    }
}

export const sortProjects = (projects, type) => {
    switch (type.key) {
        case "name-a-to-z":
            projects.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
            return projects;
        case "name-z-to-a":
            projects.sort(function (a, b) {
                return b.name.localeCompare(a.name);
            });
            return projects;
        case "created-oldest":
            projects.sort(function (a, b) {
                return new Date(a.createdAt) - new Date(b.createdAt);
            });
            return projects;
        case "created-newest":
            projects.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            return projects;
        default:
            return projects;
    }
}