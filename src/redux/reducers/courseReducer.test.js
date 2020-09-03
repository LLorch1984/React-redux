import coursereducer from './coursereducer'
import * as actions from '../actions/courseActions'


it("should add course when passed CREATE_COURSE_SUCCESS", () => {
    const initialState = [
        {
            title: "A"
        },
        {
            title: "B"
        }
    ]
    const newCourse = {
        title: "C"
    }

    const action = actions.createCourseSuccess(newCourse)

    const newState = coursereducer(initialState, action)


    expect(newState.length).toEqual(3)
    expect(newState[0].title).toEqual("A")
    expect(newState[1].title).toEqual("B")
    expect(newState[2].title).toEqual("C")
})

it('Should update course when passed UPDATE_COURSE_SUCCESS', () => {
    const initialState = [
        { id: 1, title: "A" },
        { id: 2, title: "B" },
        { id: 3, title: "C" }
    ];
    const course = { id: 2, title: "New Title" }
    const action = actions.updateCourseSuccess(course)

    const newState = coursereducer(initialState, action)
    const updatedCourse = newState.find(a => a.id == course.id)
    const unTouchedCourse = newState.find(a => a.id == 1)

    expect(updatedCourse.title).toEqual("New Title")
    expect(unTouchedCourse.title).toEqual("A")
    expect(newState.length).toEqual(3)

})
