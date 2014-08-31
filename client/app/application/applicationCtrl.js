'use strict';

angular.module('app')
.controller('ApplicationCtrl', function($scope, $state, $http, Auth, Application) {

  $scope.formData = {};
  
  // function to process the form
  $scope.processForm = function(formData) {
  $http.post('/api/applications', $scope.formData)
  .success(function(formData){
    $location.path('/applications')
  console.log(formData);
  });

    
  };
   $scope.submitFailed = function(error) {
      flashr.now.info(error);
    };

//http://stackoverflow.com/questions/15894650/http-post-in-angular-js
//http://www.treselle.com/blog/angular-js-post-data-submitting-ajax-forms/
   $scope.classList = [
      {value: 'deathknight', label: 'Death Knight'},
      {value: 'druid', label: 'Druid'},
      {value: 'mage', label: 'Mage'},
      {value: 'monk', label: 'Monk'},
      {value: 'paladin', label: 'Paladin'},
      {value: 'priest', label: 'Priest'},
      {value: 'rogue', label: 'Rogue'},
      {value: 'shaman', label: 'Shaman'},
      {value: 'warlock', label: 'Warlock'},
      {value: 'warrior', label: 'Warrior'}
    ];   
  $scope.classSpecs = [
    {value: 'affliction', label: 'Affliction'},
    {value: 'arcane', label: 'Arcane'},
    {value: 'arms', label: 'Arms'},
    {value: 'assassination', label: 'Assassination'},
    {value: 'blood', label: 'Blood'},
    {value: 'brewmaster', label: 'Brewmaster'},
    {value: 'combat', label: 'Combat'},
    {value: 'demonology', label: 'Demonology'},
    {value: 'destruction', label: 'Destruction'},
    {value: 'discipline', label: 'Discipline'},
    {value: 'elemental', label: 'Elemental'},
    {value: 'enhancement', label: 'Enhancement'},
    {value: 'feral', label: 'Feral'},
    {value: 'fire', label: 'Fire'},
    {value: 'frost', label: 'Frost'},
    {value: 'fury', label: 'Fury'},
    {value: 'guardian', label: 'Guardian'},
    {value: 'holy', label: 'Holy'},
    {value: 'mistweaver', label: 'Mistweaver'},
    {value: 'moonkin', label: 'Moonkin'},
    {value: 'protection', label: 'Protection'},
    {value: 'restoration', label: 'Restoration'},
    {value: 'retribution', label: 'Retribution'},
    {value: 'shadow', label: 'Shadow'},
    {value: 'subtlety', label: 'Subtlety'},
    {value: 'unholy', label: 'Unholy'},
    {value: 'windwalker', label: 'Windwalker'}
  ];

     $scope.microphoneInfo = [
      {label: 'Working', value: 'working'},
      {label: 'None', value: 'none'},
      {label: 'Dont Talk', value: 'silent'}
    ];

   $scope.isDisabled = false;
    $scope.disableClick = function() {
        alert("Application received!");
        $scope.isDisabled = true;
        return false;
      }       
});