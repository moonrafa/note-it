import { Template } from 'meteor/templating'
import './main.html'
import { Notes } from '../lib/collections.js'

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

    //insert into the collection
    Notes.insert({ text, createdAt: new Date() })
    //clear form
    target.text.value = ''
    //close modal

    $('#addModal').modal('close')
  }
})
