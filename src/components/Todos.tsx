import { memo } from "react";

const Todos = (props: any) => {
  const { todos } = props;
  console.log('todos', todos);

  return (<> Demop </>)

}

export default memo(Todos)