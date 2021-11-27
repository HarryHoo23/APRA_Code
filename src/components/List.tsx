import React from 'react'



interface Props {
  text: string;
}

const List: React.FC<Props> = (props) => {
  return (
    <div>
      {props.text}
    </div>
  )
}

export default List
