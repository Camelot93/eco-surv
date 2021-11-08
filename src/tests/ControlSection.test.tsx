import {render} from '@testing-library/react';
import ControlSection from '../components/ControlSection';
import userEvent from '@testing-library/user-event';


describe( "Full selection and submit process", ()=>{

it("Is able to select any Breed in array", () => {
    
    const propsData: Object = {"husky":[], "shih tzu":[]}
    const propsDataArr: string[] = Object.keys(propsData)
    const { getByTestId } = render(<ControlSection retrieveImgFunc={()=>{}} data={propsData}/>);
    expect(getByTestId(/Form/)).toBeValid()

    var i=0
    while(i<propsDataArr.length) userEvent.selectOptions(getByTestId(/select 0/),  propsDataArr[i]), i++ 
    expect(getByTestId(/select 0/)).toHaveValue(propsDataArr[propsDataArr.length-1]);
    console.log("Any Breed in array can be selected")
})


it("Is able to select any Sub Breed in available array when existent based on Breed", () => {
    const { getByTestId, queryByTestId } = render(<ControlSection retrieveImgFunc={()=>{}} data={{"mountain":["bernese", "swiss"], "huskey":[]}}/>);
    expect(getByTestId(/Form/)).toBeValid()

    expect(queryByTestId(/select 1/)).not.toBeInTheDocument()
    console.log("With default values Sub Breed list is not available")

    userEvent.selectOptions(getByTestId(/select 0/),  "huskey")
    expect(queryByTestId(/select 1/)).not.toBeInTheDocument()
    console.log("Breed selected with no Sub Breed, Sub Breed list is not available")

    userEvent.selectOptions(getByTestId(/select 0/),  "mountain")
    userEvent.selectOptions(getByTestId(/select 1/),  "bernese")
    userEvent.selectOptions(getByTestId(/select 1/),  "swiss")
    expect(getByTestId(/select 1/)).toHaveValue("swiss")
    console.log("Breed has Sub Breed, Sub Breed is available and any value in array can be selected ")
});


it("Is able to select any Number of Images", () => {
    
    const { getByTestId } = render(<ControlSection retrieveImgFunc={()=>{}} data={{"husky":[], "shih tzu":[]}}/>);
    expect(getByTestId(/Form/)).toBeValid()

    const arrLength : Number = getByTestId(/select 2/).childElementCount-1
    var i = 0 // in ControlSection.tsx reduce new Array length for better testing speed
    while(i<arrLength) userEvent.selectOptions(getByTestId(/select 2/), `${i+1}`), i++
    expect(getByTestId(/select 2/)).toHaveValue(`${arrLength}`);
    console.log("Any amount in Number of Images array can be selected")
});

beforeAll(() => jest.spyOn(window, 'fetch'))

it("Calls a function to fetch images on View Images click if all mandatory fields have a selected option, if not border turns red", () => {
    const retImgFunc =  (window.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({success: true}),
      }) 
    const { getByTestId } = render(<ControlSection retrieveImgFunc={retImgFunc} data={{"mountain":["bernese", "swiss"]}}/>);
    expect(getByTestId(/select 0/).style.borderColor).not.toBe("red")
    expect(getByTestId(/select 2/).style.borderColor).not.toBe("red")
    console.log("Both fields border colors are not red on initial render")

    expect(getByTestId(/Form/)).toBeValid()
    expect(getByTestId(/select 0/)).toHaveValue("Select")
    expect(getByTestId(/select 2/)).toHaveValue("Select")
    userEvent.click(getByTestId(/Submit/))
    console.log("Able to click on View Image")

    expect(getByTestId(/select 0/).style.borderColor).toBe("red")
    expect(getByTestId(/select 2/).style.borderColor).toBe("red")
    expect(window.fetch).toHaveBeenCalledTimes(0)
    console.log("Both mandatory field have no selected option and their border color turned red")
    console.log("fetch images not called")

    userEvent.selectOptions(getByTestId(/select 0/),  "mountain")
    expect(getByTestId(/select 0/).style.borderColor).not.toBe("red")
    expect(window.fetch).toHaveBeenCalledTimes(0)
    console.log("When selecting an option, Mandatory field border color goes back to default")
    console.log("fetch images not called")
      
    userEvent.click(getByTestId(/Submit/))
    expect(getByTestId(/select 0/).style.borderColor).not.toBe("red")
    expect(getByTestId(/select 1/).style.borderColor).not.toBe("red")
    expect(getByTestId(/select 2/).style.borderColor).toBe("red")
    expect(window.fetch).toHaveBeenCalledTimes(0)
    console.log("Sub Breed being an optional field is unaffected, Breed has a selection and it's border color is default, Number of Images border is red")
    console.log("fetch images not called")

    userEvent.selectOptions(getByTestId(/select 0/),  "Select")
    userEvent.selectOptions(getByTestId(/select 2/),  "1")
    userEvent.click(getByTestId(/Submit/))
    expect(getByTestId(/select 2/).style.borderColor).not.toBe("red")
    expect(getByTestId(/select 0/).style.borderColor).toBe("red")
    expect(window.fetch).toHaveBeenCalledTimes(0)
    console.log("Similar to previous test but Number of Images border color is default, and Breed's is red")
    console.log("fetch images not called")

    userEvent.selectOptions(getByTestId(/select 0/),  "mountain")
    userEvent.click(getByTestId(/Submit/))
    expect(getByTestId(/select 2/).style.borderColor).not.toBe("red")
    expect(getByTestId(/select 0/).style.borderColor).not.toBe("red")
    console.log("Both mandatory field have a selected option and both border colors are not red")
    
    expect(window.fetch).toHaveBeenCalledTimes(1)
    console.log("fetch images has been called once!")

   
    
});






})
