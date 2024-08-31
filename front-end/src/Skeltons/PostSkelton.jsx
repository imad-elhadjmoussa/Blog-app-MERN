import React from 'react'

export const PostSkelton = () => {
    return (
        <div className='postSkelton'>
            <div className='image '>
                <div className='skelton'></div>
            </div>

            <div className='content '>
                <h2 className='title skelton'></h2>
                <div className="info ">
                    <div className='author '>
                        <div className="avatar skelton"></div >
                        <div className='dateUsername '>
                            <p className='username skelton'> </p>
                            <p className='date skelton'>  </p>
                        </div>
                    </div>
                </div>
                <p className='summary skelton'>  </p>
            </div>
        </div>
    )
}
