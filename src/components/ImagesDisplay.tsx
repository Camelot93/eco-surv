
import React from 'react'
import Image from 'next/image'

interface ImgProp {
    data?:string[] | null
}

const ImagesDisplay = (props:ImgProp) => {
    return(
        <div className="imgContainer">
        {
         props.data?.map((el,i)=>{  
            return( 
                <React.Fragment key={i}>
                  <div className="dImg"
                  >
                    <Image unoptimized //no width and height query given for selected dogs
                    priority
                    data-testid={`Img ${i}`}
                    src={el} 
                    onLoadingComplete={_=>console.log(`Img ${i} Loaded`)}
                    loader={({src})=>src}
                    width={180} 
                    height={180}
                    />
                  </div>
                </React.Fragment>
            )
        })
        }
    </div>
    )
}

export default ImagesDisplay