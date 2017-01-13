(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileDetailController', ProfileDetailController);

    ProfileDetailController.$inject = ['$stateParams', 'conversationFactory', 'userFactory', 'authFactory', 'listingFactory', 'SweetAlert','$state'];

    /* @ngInject */
    function ProfileDetailController($stateParams, conversationFactory, userFactory, authFactory, listingFactory, SweetAlert, $state) {
        var vm = this;
        vm.title = 'ProfileDetailController';
        vm.currentUser;
        vm.logout = logout;
        vm.editListing = editListing;
        vm.listingEdits = [];
        vm.deleteListing = deleteListing;
        vm.deleteFavorite = deleteFavorite;

        activate();

        ////////////////

        function activate() {

            // conversationFactory
            //     .getAll()
            //     .then(function(response) {
            //         vm.conversations = response.data;
            //     });
            console.log('hellllllo')
            userFactory
                .getMe()
                .then(function(response) {
                    vm.currentUser = response.data;

                    console.log(vm.currentUser);
                });
        }

        function editListing(listingId, listing) {
            listingFactory
                .update(listingId, listing)
                .then(function() {
                    SweetAlert.swal('Good job!', 'The listing was updated successfully', 'success');
                })
        }

        function logout() {
            console.log('Logged out worked!')
            authFactory.logout();
        }
        function deleteFavorite(listingId) {
            userFactory
                .removeFavoriteFromUser(listingId)
                .then(function(response) {
                                var index = vm.currentUser.favoriteListings.indexOf(listingId)

                                vm.currentUser.favoriteListings.splice(index, 1);

                                SweetAlert.swal("It worked!", "Your listing has been deleted", "success");
                            })
                            .catch(function(error) {
                                SweetAlert.swal("Oops!", "There was a problem deleting your listing.", "error");
                            });

                console.log("deleteFavorite")
        }

        function deleteListing(listing) {
            SweetAlert.swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this listing.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                },
                function(confirm) {
                    if (confirm) {
                        listingFactory
                            .remove(listing.listingId)
                            .then(function(response) {
                                var index = vm.currentUser.listings.indexOf(listing)

                                vm.currentUser.listings.splice(index, 1);

                                SweetAlert.swal("It worked!", "Your listing has been deleted", "success");
                            })
                            .catch(function(error) {
                                SweetAlert.swal("Oops!", "There was a problem deleting your listing.", "error");
                            });
                    }
                });






        }
    }


})();
