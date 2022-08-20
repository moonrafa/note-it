import { Template } from 'meteor/templating'
import './main.html'
import { Notes } from '../lib/collections.js'

Template.body.helpers({
  /*  notes: [{ text: 'My note 1' }, { text: 'My note 2' }, { text: 'My note 3' }]*/
  notes() {
    return Notes.find({})
  }
})
