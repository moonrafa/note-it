import { Template } from 'meteor/templating'
import './main.html'
import { Notes } from '../lib/collections.js'
import { Accounts } from 'meteor/accounts-base'

//accounts config
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
})

Template.body.helpers({
  /*  notes: [{ text: 'My note 1' }, { text: 'My note 2' }, { text: 'My note 3' }]*/
  notes() {
    return Notes.find({})
  }
})

Template.add.events({
  'submit .add-form': function () {
    e.preventDefault()
    //get the input value
    const target = e.target
    const text = target.text.value

    /*insert into the collection
    Notes.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    })*/
    Meteor.insert('note.insert', text)
    //clear form
    target.text.value = ''
    //close modal

    $('#addModal').modal('close')
  }
})

Template.note.events({
  'click .delete-note': function () {
    //Notes.remove(this._id)
    Meteor.call('note.remove', this)
    return false
  }
})
