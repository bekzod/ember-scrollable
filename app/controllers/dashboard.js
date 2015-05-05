import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['currentUser'],
  currentUser: Ember.computed.oneWay('controllers.currentUser'),
  teamId: null,

  selectedTeam: Ember.computed('teamId', 'teams.@each.id', function(key, value) {
    if (arguments.length > 1) {
      if (value != null) {
        this.set('teamId', value.get('id'));
      } else {
        this.set('teamId', null);
      }
    }

    var teamId = this.get('teamId');

    if (teamId != null) {
      return this.get('teams').findBy('id', this.get('teamId'));
    } else {
      return null;
    }
  }),

  queryParams: {
    teamId: 'team_id'
  },

  upcomingInteractions: Ember.computed('interactions.[]', function() {
    return this.get('interactions')
      .filterBy('scheduledCallTime')
      .sortBy('scheduledCallTime');
  }),

  interactionsToSchedule: Ember.computed('interactions.[]', function() {
    return this.get('interactions').filter(function(interaction) {
      return interaction.get('requestedAt') != null &&
        interaction.get('scheduledCallTime') == null &&
        !interaction.get('actioned');
    }).sort(function(a, b) {
      return -Ember.compare(a.get('requestedAt'), b.get('requestedAt'));
    });
  })
});
