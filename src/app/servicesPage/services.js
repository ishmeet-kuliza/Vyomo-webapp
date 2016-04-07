/**
 * Services Module
 */

angular.module( 'vyomo.servicesPage', [
    'ui.router',
    'ui.bootstrap',
    'vyomo.apis'
])

    .config(function config( $stateProvider ) {
        $stateProvider.state( 'servicesPage', {
            url: '/servicesPage',
            views: {
                "main": {
                    controller: 'ServiceCtrl',
                    templateUrl: 'servicesPage/views/services.tpl.html'
                }
            },
            data:{ pageTitle: 'Beauty Services' }
        })
            .state('servicesPage.list',{
                url : "/list",
                views : {
                    "packagesView":{
                        controller : 'ServicePackageCtrl',
                        templateUrl : 'servicesPage/views/packageList.tpl.html'
                    },
                    "servicesView":{
                        controller : 'ServiceListCtrl',
                        templateUrl : 'servicesPage/views/serviceList.tpl.html'
                    }
                }
            })
        ;
    })

    /**
     * And of course we define a controller for our route.
     */
    .controller( 'ServiceCtrl', function ServiceController( $scope,$state, vyomoAPIservice ) {
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
        }


        $scope.getServicesPackages = function() {
            if ($scope.data.selectedCity != null) {
                $scope.citySelected = true;


                //API calling to get packages and services
                var cityName = $scope.data.selectedCity;
                var latLong = angular.element('.vm-select-city option:selected').attr('latLong');
                    vyomoAPIservice.getPackages(latLong).success(function (response) {
                        $scope.packages = [];
                        $scope.services = [];
                        if (response.hasOwnProperty("message")) {
                            if (response.message.hasOwnProperty('categories')) {
                                for (var i in response.message.categories) {
                                    var categories = response.message.categories;
                                    if (categories[i].label === "Packages") {
                                        var packagesList = categories[i].services_by_group;
                                        packagesList.sort(function (a, b) {
                                            a = parseInt(a.services[0].cost_including_discount);
                                            b = parseInt(b.services[0].cost_including_discount);
                                            return a - b;
                                        });
                                        ////Function to fill in packages list
                                        //fillPackagesList(packagesList);
                                        $scope.packages = packagesList
                                    }
                                    if (categories[i].label === "Menu") {
                                        $scope.services = categories[i].services_by_group;

                                    }
                                }

                            }
                        }
                    });
                $state.go('services.list');
            }
        }
    })

    .controller( 'ServicePackageCtrl', function ServiceController( $scope) {

    })

    .controller( 'ServiceListCtrl', function ServiceController( $scope ) {

    });