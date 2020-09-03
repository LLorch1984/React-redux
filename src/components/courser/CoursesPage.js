import React from 'react'
import { connect } from 'react-redux'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorAction from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import CoursesList from './CourseList'
import { Redirect } from 'react-router-dom'
import Spinner from '../common/Spinner'
import { toast } from 'react-toastify'

class CoursesPage extends React.Component {
    state = {
        redirectToAddCoursePage: false
    }


    componentDidMount() {
        const { courses, authors, actions } = this.props

        if (courses.length === 0) {
            actions.loadCourses().catch(error => {
                debugger
                alert('betho hijo de puta' + error)
            })
        }
        if (authors.length === 0) {
            actions.loadAuthors().catch(error => {
                debugger
                alert('betho hace trampas al catan' + error)
            })
        }
    }

    handleDeleteCourse = course => {
        toast.success("course deleted")
        this.props.actions.deleteCourse(course).catch(error => {
            toast.error("delete failed" + error.message, { autoClose: false })
        })
    }

    render() {
        return (
            <>
                {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
                <h2>Courses</h2>
                {this.props.loading ? (
                    <Spinner />) : (
                        <><button
                            style={{ marginbottom: 20 }}
                            className="btn btn-primary add course"
                            onClick={() => this.setState({ redirectToAddCoursePage: true })}
                        >
                            Add Course
                </button>
                            <CoursesList onDeleteClick={this.handleDeleteCourse} courses={this.props.courses} />
                        </>
                    )}
            </>
        )
    }
}

CoursesPage.propTypes = {
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    debugger
    return {
        courses: state.authors.length === 0
            ? []
            : state.courses.map(course => {
                return {
                    ...course,
                    authorName: state.authors.find(a => a.id === course.authorId).name
                }
            }),
        authors: state.authors,
        loading: state.apiCallsInProgress > 0

    }
}

function mapDispatchToProps(dispatch) {
    debugger
    return {

        actions: {

            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorAction.loadAuthors, dispatch),
            deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)

        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)