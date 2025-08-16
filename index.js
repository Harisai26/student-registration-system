import React, {Component} from 'react'

import './index.css'

// ====================================================================================
// Constants & Initial Data
// Dev-note: In a real app, this data would come from an API.
// ====================================================================================

const INITIAL_COURSE_TYPES = [
  {id: 1, name: 'Individual'},
  {id: 2, name: 'Group'},
  {id: 3, name: 'Special'},
]

const INITIAL_COURSES = [
  {id: 1, name: 'Hindi'},
  {id: 2, name: 'English'},
  {id: 3, name: 'Urdu'},
]

const INITIAL_OFFERINGS = [
  {id: 1, courseId: 2, courseTypeId: 1},
  {id: 2, courseId: 1, courseTypeId: 2},
]

const INITIAL_REGISTRATIONS = [
  {id: 1, studentName: 'Aarav Sharma', offeringId: 2},
  {id: 2, studentName: 'Diya Patel', offeringId: 2},
]

// A simple helper for SVG icons to keep the render method clean.
const Icon = ({path, className = 'w-6 h-6'}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d={path} />
  </svg>
)

// ====================================================================================
// Main App Component
// ====================================================================================

export default class App extends Component {
  state = {
    courseTypes: INITIAL_COURSE_TYPES,
    courses: INITIAL_COURSES,
    courseOfferings: INITIAL_OFFERINGS,
    registrations: INITIAL_REGISTRATIONS,

    // Form input fields
    courseTypeNameInput: '',
    courseNameInput: '',
    offeringCourseId: '',
    offeringCourseTypeId: '',
    studentNameInput: '',
    registrationOfferingId: '',

    // UI state
    editingCourseTypeId: null,
    editingCourseId: null,
    offeringFilter: 'all',
    viewRegistrationsFor: '',
  }

  // --- UTILITY METHODS ---

  getOfferingName = offering => {
    const {courses, courseTypes} = this.state
    const course = courses.find(c => c.id === offering.courseId)
    const type = courseTypes.find(ct => ct.id === offering.courseTypeId)
    return `${type?.name || 'Unknown Type'} - ${
      course?.name || 'Unknown Course'
    }`
  }

  // --- EVENT HANDLERS ---

  // Generic handler for simple input changes.
  handleInputChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  // --- Course Type Logic ---
  handleCourseTypeSubmit = e => {
    e.preventDefault()
    const {courseTypeNameInput, editingCourseTypeId} = this.state
    if (!courseTypeNameInput.trim()) return

    if (editingCourseTypeId) {
      // Update existing type
      this.setState(prevState => ({
        courseTypes: prevState.courseTypes.map(ct =>
          ct.id === editingCourseTypeId
            ? {...ct, name: courseTypeNameInput}
            : ct,
        ),
        editingCourseTypeId: null,
        courseTypeNameInput: '',
      }))
    } else {
      // Add new type
      const newType = {id: Date.now(), name: courseTypeNameInput}
      this.setState(prevState => ({
        courseTypes: [...prevState.courseTypes, newType],
        courseTypeNameInput: '',
      }))
    }
  }

  handleEditCourseType = type => {
    this.setState({
      editingCourseTypeId: type.id,
      courseTypeNameInput: type.name,
    })
  }

  handleDeleteCourseType = id => {
    this.setState(prevState => ({
      courseTypes: prevState.courseTypes.filter(ct => ct.id !== id),
    }))
  }

  // --- Course Logic ---
  handleCourseSubmit = e => {
    e.preventDefault()
    const {courseNameInput, editingCourseId} = this.state
    if (!courseNameInput.trim()) return

    if (editingCourseId) {
      this.setState(prevState => ({
        courses: prevState.courses.map(c =>
          c.id === editingCourseId ? {...c, name: courseNameInput} : c,
        ),
        editingCourseId: null,
        courseNameInput: '',
      }))
    } else {
      const newCourse = {id: Date.now(), name: courseNameInput}
      this.setState(prevState => ({
        courses: [...prevState.courses, newCourse],
        courseNameInput: '',
      }))
    }
  }

  handleEditCourse = course => {
    this.setState({editingCourseId: course.id, courseNameInput: course.name})
  }

  handleDeleteCourse = id => {
    this.setState(prevState => ({
      courses: prevState.courses.filter(c => c.id !== id),
    }))
  }

  // --- Offering Logic ---
  handleOfferingSubmit = e => {
    e.preventDefault()
    const {offeringCourseId, offeringCourseTypeId} = this.state
    if (!offeringCourseId || !offeringCourseTypeId) return

    const newOffering = {
      id: Date.now(),
      courseId: parseInt(offeringCourseId),
      courseTypeId: parseInt(offeringCourseTypeId),
    }
    this.setState(prevState => ({
      courseOfferings: [...prevState.courseOfferings, newOffering],
      offeringCourseId: '',
      offeringCourseTypeId: '',
    }))
  }

  handleDeleteOffering = id => {
    this.setState(prevState => ({
      courseOfferings: prevState.courseOfferings.filter(o => o.id !== id),
    }))
  }

  // --- Registration Logic ---
  handleRegistrationSubmit = e => {
    e.preventDefault()
    const {studentNameInput, registrationOfferingId} = this.state
    if (!studentNameInput.trim() || !registrationOfferingId) return

    const newRegistration = {
      id: Date.now(),
      studentName: studentNameInput,
      offeringId: parseInt(registrationOfferingId),
    }
    this.setState(prevState => ({
      registrations: [...prevState.registrations, newRegistration],
      studentNameInput: '',
      registrationOfferingId: '',
    }))
  }

  // --- PRIVATE RENDER METHODS ---
  // Breaking the UI into smaller chunks makes the main render method easier to read.

  renderCourseTypesCard() {
    const {courseTypes, courseTypeNameInput, editingCourseTypeId} = this.state
    return (
      <div className="course-card-container">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          📚 Course Types
        </h2>
        <form
          onSubmit={this.handleCourseTypeSubmit}
          className="flex gap-2 mb-4"
        >
          <input
            type="text"
            name="courseTypeNameInput"
            value={courseTypeNameInput}
            onChange={this.handleInputChange}
            placeholder="e.g., Individual"
            className="input"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {editingCourseTypeId ? 'Update' : 'Add'}
          </button>
        </form>

        <ul className="space-y-2">
          {courseTypes.map(type => (
            <li
              key={type.id}
              className="flex justify-between items-center bg-slate-50 p-2 rounded-md"
            >
              <span>{type.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => this.handleEditCourseType(type)}
                  className="text-slate-500 hover:text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => this.handleDeleteCourseType(type.id)}
                  className="text-slate-500 hover:text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderCoursesCard() {
    const {courses, courseNameInput, editingCourseId} = this.state
    return (
      <div className="course-card-container">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">📖 Courses</h2>
        <form onSubmit={this.handleCourseSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            name="courseNameInput"
            value={courseNameInput}
            onChange={this.handleInputChange}
            placeholder="e.g., Hindi"
            className="flex-grow p-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {editingCourseId ? 'Update' : 'Add'}
          </button>
        </form>
        <ul className="space-y-2">
          {courses.map(course => (
            <li
              key={course.id}
              className="flex justify-between items-center bg-slate-50 p-2 rounded-md"
            >
              <span>{course.name}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => this.handleEditCourse(course)}
                  className="text-slate-500 hover:text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => this.handleDeleteCourse(course.id)}
                  className="text-slate-500 hover:text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderOfferingsCard() {
    const {
      courses,
      courseTypes,
      courseOfferings,
      offeringCourseId,
      offeringCourseTypeId,
      offeringFilter,
    } = this.state
    const filteredOfferings =
      offeringFilter === 'all'
        ? courseOfferings
        : courseOfferings.filter(
            o => o.courseTypeId === parseInt(offeringFilter),
          )

    return (
      <div className="course-card-container">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          🏫 Course Offerings
        </h2>
        <form onSubmit={this.handleOfferingSubmit} className="space-y-2 mb-4">
          <select
            name="offeringCourseId"
            value={offeringCourseId}
            onChange={this.handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Course</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            name="offeringCourseTypeId"
            value={offeringCourseTypeId}
            onChange={this.handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Course Type</option>
            {courseTypes.map(ct => (
              <option key={ct.id} value={ct.id}>
                {ct.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Create Offering
          </button>
        </form>
        <div className="mb-2">
          <label htmlFor="offeringFilter" className="block text-sm font-medium">
            Filter by Type:
          </label>
          <select
            id="offeringFilter"
            name="offeringFilter"
            value={offeringFilter}
            onChange={this.handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="all">All Types</option>
            {courseTypes.map(ct => (
              <option key={ct.id} value={ct.id}>
                {ct.name}
              </option>
            ))}
          </select>
        </div>
        <ul className="space-y-2">
          {filteredOfferings.map(offering => (
            <li
              key={offering.id}
              className="flex justify-between items-center bg-slate-50 p-2 rounded-md"
            >
              <span>{this.getOfferingName(offering)}</span>
              <button
                onClick={() => this.handleDeleteOffering(offering.id)}
                className="text-slate-500 hover:text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderRegistrationsCard() {
    const {
      courseOfferings,
      registrations,
      studentNameInput,
      registrationOfferingId,
      viewRegistrationsFor,
    } = this.state
    const registeredStudents = !viewRegistrationsFor
      ? []
      : registrations.filter(
          r => r.offeringId === parseInt(viewRegistrationsFor),
        )

    return (
      <div className="course-card-container">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">
          🧑‍🎓 Student Registrations
        </h2>
        <form
          onSubmit={this.handleRegistrationSubmit}
          className="space-y-2 mb-4"
        >
          <input
            type="text"
            name="studentNameInput"
            value={studentNameInput}
            onChange={this.handleInputChange}
            placeholder="Student's Name"
            className="w-full p-2 border rounded-md"
          />
          <select
            name="registrationOfferingId"
            value={registrationOfferingId}
            onChange={this.handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Course Offering</option>
            {courseOfferings.map(o => (
              <option key={o.id} value={o.id}>
                {this.getOfferingName(o)}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Register Student
          </button>
        </form>
        <div className="mb-2">
          <label
            htmlFor="registrationsFilter"
            className="block text-sm font-medium"
          >
            View Registrations For:
          </label>
          <select
            id="registrationsFilter"
            name="viewRegistrationsFor"
            value={viewRegistrationsFor}
            onChange={this.handleInputChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select an Offering</option>
            {courseOfferings.map(o => (
              <option key={o.id} value={o.id}>
                {this.getOfferingName(o)}
              </option>
            ))}
          </select>
        </div>
        <ul className="space-y-2">
          {registeredStudents.length > 0
            ? registeredStudents.map(reg => (
                <li key={reg.id} className="bg-slate-50 p-2 rounded-md">
                  {reg.studentName}
                </li>
              ))
            : viewRegistrationsFor && (
                <p className="text-slate-500 text-center p-2">
                  No students registered.
                </p>
              )}
        </ul>
      </div>
    )
  }

  // --- MAIN RENDER METHOD ---
  render() {
    return (
      <div className="main-container">
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-slate-700">
              Student Registration System
            </h1>
          </div>
        </header>

        <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {this.renderCourseTypesCard()}
          {this.renderCoursesCard()}
          {this.renderOfferingsCard()}
          {this.renderRegistrationsCard()}
        </main>
      </div>
    )
  }
}
