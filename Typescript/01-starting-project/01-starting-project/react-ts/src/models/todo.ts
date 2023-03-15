// class 이름은 type으로도 사용할 수 있음

class Todo {
  // 클래스형 컴포넌트에서 type 지정
  id: string;
  text: string;

  constructor(todoText:string) {
    this.text = todoText;
    this.id = new Date().toISOString()
  }
}

export default Todo