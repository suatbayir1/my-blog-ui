export const filterPostsBySearchTerm = (posts, term) => {
    try {
        if (term.trim() === "") {
            return posts;
        }

        let filteredPosts = posts.filter(post => post.title.toLowerCase().includes(term.toLowerCase()));

        return filteredPosts;
    } catch (e) {
        return posts;
    }
}

export const filterPostsByCategory = (posts, term) => {
    try {
        if (term.trim() === "" || term === "All") {
            return posts;
        }

        let filteredPosts = posts.filter(post => post.category.toLowerCase().includes(term.toLowerCase()));

        return filteredPosts;
    } catch (e) {
        return posts;
    }
}

export const filterProjectsByName = (projects, term) => {
    try {
        if (term.trim() === "") {
            return projects;
        }

        let filteredProjects = projects.filter(project => project.name.toLowerCase().includes(term.toLowerCase()));

        return filteredProjects;
    } catch (e) {
        return projects;
    }
}

export const filterProjectsByKeyword = (projects, term) => {
    try {
        if (term === "All") {
            return projects;
        }

        let filteredPosts = projects.filter(project => project.keywords.includes(term));

        return filteredPosts;
    } catch (e) {
        return projects;
    }
}