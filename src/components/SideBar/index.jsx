import React from 'react'
import classNames from 'classnames'

const SideBar = ({ optionInfo, ModelInfo, setSelectedMapInfo, selectedMapInfo }) => {
  
  return (
    <div className='side-bar'>
      <p className='model-name-text'>{ModelInfo.name}</p>
      {optionInfo.map((obj_value, obj_index) => {        
          return ModelInfo[obj_value] && (
            <div key={`${obj_value}_${obj_index}`}>
              <p className='option-title-text'>{ModelInfo[obj_value].obj_name}</p>
              <div className='texture-container'>
                {ModelInfo[obj_value].obj_content.map((texture, map_index) => {
                    return (
                      <div role="button"  key={`${texture}_${map_index}`}  onClick={() => 
                        setSelectedMapInfo({
                          'id': `${obj_value}_${texture}`,
                          'obj_value': obj_value,
                          'texture': texture
                        })}>
                        <img className={classNames('texture-img', {"texture-img-active": selectedMapInfo?.id === `${obj_value}_${texture}`})} alt='texture' src={texture} height={80} />
                      </div>
                  )
                })}
              </div>
            </div>
          )
        }
      )}
    </div>
  )
}

export default SideBar