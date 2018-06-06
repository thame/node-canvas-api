let { google } = require('googleapis')
let authentication = require('./authentication')
let sheets = google.sheets('v4')
const getAllCoursesInTerm = require('../recipes/getAllCoursesInTerm')

require('dotenv').config()

const spreadsheetId = process.env.GOOGLE_SHEETS_ID

const coursesInTerm = courses => courses.map(courses => courses.name)

const getDept = (courses) => courses.map(course => course.split(' ')[0])

const getSection = (courses) => courses.map(course => course.split(' ')[2])

const getID = termCourses => termCourses.map(course => course.id)

const getModules = (accountID, year, term) => getAllCoursesInTerm(accountID, year, term)

const copyCourseNames = (auth, data) => {
  const sheets = google.sheets({ version: 'v4', auth })
  sheets.spreadsheets.values.batchUpdate({
    auth,
    spreadsheetId: spreadsheetId,
    resource: {
      valueInputOption: 'RAW',
      data: [
        {
          range: 'A2',
          majorDimension: 'COLUMNS',
          values: [data]
        }
      ]
    }
  }, (err, result) => {
    if (err) {
      console.log('The API returned an error: ' + err)
      return
    }
    console.log('Courses copied, please check at https://docs.google.com/spreadsheets/d/1PyTUob8HNSsjr0_SWRbPBTSdFeY5kjCE5yxmgcQMljI/edit#gid=0')
    return result
  })
}

const copyDept = (auth, data) => {
  const sheets = google.sheets({ version: 'v4', auth })
  sheets.spreadsheets.values.batchUpdate({
    auth,
    spreadsheetId: spreadsheetId,
    resource: {
      valueInputOption: 'RAW',
      data: [
        {
          range: 'B2',
          majorDimension: 'COLUMNS',
          values: [data]
        }
      ]
    }
  }, (err, result) => {
    if (err) {
      console.log('The API returned an error: ' + err)
      return
    }
    console.log('Dept copied, please check at https://docs.google.com/spreadsheets/d/1PyTUob8HNSsjr0_SWRbPBTSdFeY5kjCE5yxmgcQMljI/edit#gid=0')
    return result
  })
}

const copySection = (auth, data) => {
  const sheets = google.sheets({ version: 'v4', auth })
  sheets.spreadsheets.values.batchUpdate({
    auth,
    spreadsheetId: spreadsheetId,
    resource: {
      valueInputOption: 'RAW',
      data: [
        {
          range: 'C2',
          majorDimension: 'COLUMNS',
          values: [data]
        }
      ]
    }
  }, (err, result) => {
    if (err) {
      console.log('The API returned an error: ' + err)
      return
    }
    console.log('Section copied, please check at https://docs.google.com/spreadsheets/d/1PyTUob8HNSsjr0_SWRbPBTSdFeY5kjCE5yxmgcQMljI/edit#gid=0')
    return result
  })
}

const copyID = (auth, data) => {
  const sheets = google.sheets({ version: 'v4', auth })
  sheets.spreadsheets.values.batchUpdate({
    auth,
    spreadsheetId: spreadsheetId,
    resource: {
      valueInputOption: 'RAW',
      data: [
        {
          range: 'D2',
          majorDimension: 'COLUMNS',
          values: [data]
        }
      ]
    }
  }, (err, result) => {
    if (err) {
      console.log('The API returned an error: ' + err)
      return
    }
    console.log('ID copied, please check at https://docs.google.com/spreadsheets/d/1PyTUob8HNSsjr0_SWRbPBTSdFeY5kjCE5yxmgcQMljI/edit#gid=0')
    return result
  })
}

const eraseAll = (auth, data) => {
  const sheets = google.sheets({ version: 'v4', auth })
  sheets.spreadsheets.values.clear({
    auth,
    spreadsheetId: spreadsheetId,
    range: data
  }, (err, result) => {
    if (err) {
      console.error(err)
    }
    console.log('Sheet erased, please check at https://docs.google.com/spreadsheets/d/1PyTUob8HNSsjr0_SWRbPBTSdFeY5kjCE5yxmgcQMljI/edit#gid=0')
    return result
  })
}

module.exports = {
  coursesInTerm,
  getDept,
  getSection,
  getID,
  getModules,
  copyCourseNames,
  copyDept,
  copySection,
  copyID,
  eraseAll
}