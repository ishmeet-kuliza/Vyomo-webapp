/**
 * Services Module
 */

angular.module( 'vyomo.servicesPage', [
    'ui.router',
    'ui.bootstrap'
])

    /**
     * And of course we define a controller for our route.
     */
    .controller( 'ServiceCtrl', ['$scope', '$state', 'vyomoAPIservice', function ServiceController( $scope,$state, vyomoAPIservice ) {
        $scope.citySelected = false;
        $scope.data = {
            selectedCity : null,
            cities:[
                {
                    name : "Bangalore",
                    lat_long : "12.9667,77.566"
                },
                {
                    name : "Delhi/NCR",
                    lat_long : "28.613,77.209"
                },
                {
                    name : "Mumbai",
                    lat_long : "18.975,72.825"
                }
            ]
        }; 

        function _sortAccordingtoPrice(packagesList) {
            return packagesList.sort(function (a, b) {
                                a = parseInt(a.services[0].cost_including_discount, 10);
                                b = parseInt(b.services[0].cost_including_discount, 10);
                                return (a - b);
                            });
        }


        $scope.getServicesPackages = function() {
            if ($scope.data.selectedCity != null) {
                $scope.citySelected = true;

                //API calling to get packages and services
                //var cityName = $scope.data.selectedCity;
                var latLong = angular.element('.vm-select-city option:selected').attr('latLong');
                vyomoAPIservice.getPackages(latLong).success(function (response) {
                    $scope.packages = [];
                    $scope.services = [];
                    if (response.hasOwnProperty("message")) {
                        if (response.message.hasOwnProperty('categories')) {
                            for (var i in response.message.categories) {
                                var categories = response.message.categories;
                                if (categories[i].label === "Packages") {
                                    $scope.packages = _sortAccordingtoPrice(categories[i].services_by_group);
                                    
                                    ////Function to fill in packages list
                                    //fillPackagesList(packagesList);
                                }
                                if (categories[i].label === "Menu") {
                                    $scope.services = categories[i].services_by_group;
                                }
                            }

                        }
                    }
                });
                $state.go('servicesPage.list');
            }
        };
    }])

    .controller( 'ServicePackageCtrl', function ServiceController() {

    })

    .controller( 'ServiceListCtrl',['$scope', function ServiceController( $scope) {
        //For each service sub list of its types, collapsed flag
        $scope.isCollapsed = true;
    }]);