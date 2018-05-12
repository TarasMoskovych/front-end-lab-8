const app = angular.module('app', []);
app.controller('controller', ['$scope', function ($scope) {
    let toDelete;
    $scope.allPosts = defaultPosts;
    $scope.editmode = false;
    $scope.posts = $scope.allPosts;

    $scope.renderCategories = () => {
        let categories = ['All'];
        $scope.allPosts.forEach(post => {
            post.categories.forEach(item => {
                if(categories.indexOf(item) === -1){
                    categories.push(item);
                }
            })
        });
        return categories;
    };

    $scope.categories = $scope.renderCategories();

    $scope.deletePost = () => {
        $scope.allPosts.splice(toDelete, 1);
        $scope.categories = $scope.renderCategories();
        $('#deletePostModal').modal('hide');
    };

    $scope.setPostToDelete = input => {
        toDelete = input;
    };

    $scope.sortByDate = (value) => {
        $scope.allPosts.sort((item1, item2) => new Date(item2.date) - new Date(item1.date));
    };

    $scope.sortByTitle = (value) => {
        $scope.allPosts.sort((item1, item2) => item1.title.localeCompare(item2.title));
    };

    $scope.applyFilter = (category) => {
        if(category === 'All') {
            $scope.posts = $scope.allPosts;
        } else {
            $scope.posts = [];
            $scope.allPosts.forEach(post => {
                if(post.categories.indexOf(category) !== -1) {
                    $scope.posts.push(post);
                }
            })
        }
    };

    $scope.clearFields = () => {
        $scope.error = false;
    };

    $scope.addNewPost = (title, category, description, photo) => {
        if(!title || !category || !description){
            $scope.error = true;

        } else {
            if(!photo){
                photo = 'assets/default.png';
            }

            let categories = category.split(',');
            let newPost = {
                title: title,
                categories: categories,
                date: new Date().toLocaleString(),
                description: description,
                url: photo
            };

            $scope.allPosts.push(newPost);
            $scope.categories = $scope.renderCategories();

            $scope.inputTitle = null;
            $scope.inputDesciption = null;
            $scope.inputCategories = null;
            $scope.inputPhoto = null;

            $('#title').val('');
            $('#categories').val('');
            $('#description').val('');
            $('#addPostModal').modal('hide');
        }
    }
}]);

app.directive("contenteditable", () => {
    return {
        require: "ngModel",
        link: (scope, element, attrs, ngModel) => {

            const read = () => {
                ngModel.$setViewValue(element.html());
            };

            ngModel.$render = function() {
                element.html(ngModel.$viewValue || "");
            };

            element.bind("blur keyup change", function() {
                scope.$apply(read);
            });
        }
    };
});

app.directive('scrollOnClick', function() {
    return {
        restrict: 'EA',
        template:'<a id="scrolltag" title="Click here to go top" class="scrollup">Scroll</a>',
        link: (scope, $elm) => {
            let scrollObject = {};
            let scrollElement = document.getElementById('scrolltag');
            const getScrollPosition = () =>{
                scrollObject = {
                    x: window.pageXOffset,
                    y: window.pageYOffset
                };
                if(scrollObject.y > 350) {
                    scrollElement.classList.add("visible");
                } else {
                    scrollElement.classList.remove("visible");
                }
            };

            const scrollToTop = () => {
                let scrollDuration = 500;
                let scrollStep = -window.scrollY / (scrollDuration / 15);
                let scrollInterval = setInterval(() => {
                    if (window.scrollY != 0) {
                        window.scrollBy(0, scrollStep);
                    } else {
                        clearInterval(scrollInterval);
                    }
                }, 15);
            };

            window.onscroll = getScrollPosition;
            scrollElement.addEventListener("click", scrollToTop, false);
        }
    }
});