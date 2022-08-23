import { Template } from 'meteor/templating'
import './main.html'
import { Notes } from '../lib/collections.js'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import M from 'materialize-css'
import '../lib/collections.js'

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
document.addEventListener('DOMContentLoaded', function () {
  var elem = document.querySelector('.modal')
  const instance = M.Modal.init(elem, { dismissible: false })
  instance.open()
  // var instances = M.Modal.init(elems, options)
})

Template.add.events({
  'submit .add-form'(e) {
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
    Meteor.call('notes.insert', text)
    //clear form
    target.text.value = ''
    //close modal
  }
})

Template.note.events({
  'click .delete-note': function () {
    //Notes.remove(this._id)
    Meteor.call('notes.remove', this)
    return false
  }
})
