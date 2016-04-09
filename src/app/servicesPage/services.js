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
                                a = parseInt(a.cost, 10);
                                b = parseInt(b.cost, 10);
                                return (a - b);
                            });
        }


        $scope.getServicesPackages = function() {
            if ($scope.data.selectedCity != null) {
                $scope.citySelected = true;

                //API calling to get packages and services
                //var cityName = $scope.data.selectedCity;
                //var city = angular.element('.vm-select-city option:selected').attr('latLong');

                var cityElem = document.querySelector(".vm-select-city");
                var city = cityElem.options[cityElem.selectedIndex].value;

                //API Call success method block
                vyomoAPIservice.getAllPackagesServices(city).success(function (response) {
                    $scope.packages = [];
                    $scope.services = [];
                    window.console.log(response);
                    if(response.hasOwnProperty("status_code")){
                        if(response.status_code === 200){
                            if (response.hasOwnProperty("message")) {
                                if (response.message.hasOwnProperty('packages')) {
                                    var packagesJson = response.message.packages;
                                    if(packagesJson.hasOwnProperty("all")){
                                        var allPackages = packagesJson.all;
                                        $scope.packages = _sortAccordingtoPrice(allPackages);
                                        window.console.log($scope.packages);

                                    }
                                }

                                if (response.message.hasOwnProperty('services')) {
                                    var servicesJson = response.message.services;
                                    if(servicesJson.hasOwnProperty("all")){
                                        var allServices = servicesJson.all;
                                        $scope.services = allServices;

                                        window.console.log($scope.services);
                                        //for (var i = 0 ; i< allServices.length; i++){
                                        //    var tempObj = {};
                                        //
                                        //    //$scope.services =
                                        //}
                                    }
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

        //Function Call Attach on change event of service list checkbox

    }]);