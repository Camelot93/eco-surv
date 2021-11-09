import {render} from '@testing-library/react';
import ImagesDisplay from '../components/ImagesDisplay';

it("Attributes data to image src and displays it if value is not null || empty array",()=>{
    var data:string[] = ["https://images.dog.ceo/breeds/boxer/n02108089_10901.jpg", "https://images.dog.ceo/breeds/boxer/n02108089_10774.jpg", "https://images.dog.ceo/breeds/boxer/n02108089_4002.jpg"]
    const {getByTestId, queryByTestId, rerender} = render(<ImagesDisplay data={null} />);
    var i = 0
    expect(queryByTestId(/Img 0/)).not.toBeInTheDocument()
    console.log("Image not displayed with data value being null")

    rerender(<ImagesDisplay data={[]}/>)
    expect(queryByTestId(/Img 0/)).not.toBeInTheDocument()
    console.log("Image not displayed with data value being a empty array")

    rerender(<ImagesDisplay data={data}/>)
    while(i<data.length) {
     expect(getByTestId(`Img ${i}`)).toHaveAttribute('src') 
     console.log("Image displayed with base64 of",getByTestId(`Img ${i}`)?.getAttribute('src'))
     i++
    }
})
