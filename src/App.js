import {
  Box,
  Checkbox,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const App = () => {
  const [todos, settodos] = useState(() => {
    const getTodo = localStorage.getItem("todos");
    return getTodo ? JSON.parse(getTodo) : [];
    // JSON.parse json문자열의 구문을 분석하고, 그결과에서 자바스크립트로 반환한다
  });

  console.log(todos);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmitHandler = (data) => {
    const { todo } = data;
    settodos([
      ...todos,
      // 원래 객체에서 뒤에 이어서 넣어진다
      // ... 배열을 까고 객체를 가지고와준다
      {
        id: Date.now(),
        //아이디 값을 시간값으로 대신한다.
        text: todo,
        finish: false,
      },
    ]);
    reset();
    //reset() : input창 입력후 없어짐
  };

  const onChangeCheck = (id) => {
    settodos(
      todos.map((data) =>
        data.id === id ? { ...data, finish: !data.finish } : data
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    // JSON.stringify 자바스크립트 값을 json형식으로 바꾼다
  }, [todos]);

  return (
    <Container
      maxW={"450px"}
      w={"100%"}
      h={"100vh"}
      margin={"0 auto"}
      bgColor={"gray.100"}
      p={"50px 20px"}
    >
      <Heading>WHAT TO DO</Heading>

      <Box as="form" m={"30px 0"} onSubmit={handleSubmit(onSubmitHandler)}>
        <Input
          {...register("todo", {
            required: "내용을 작성해주세요",
          })}
          placeholder="아이디를 입력해주세요"
          borderColor={"gray.400"}
          size={"md"}
        />
      </Box>

      <Box>
        <VStack>
          {todos.map((data) => (
            <Checkbox
              key={data.id}
              w={"100%"}
              size={"lg"}
              h={"60px"}
              bgColor={"white"}
              p={"15px"}
              borderRadius={"10px"}
              isChecked={data.finish}
              onChange={() => onChangeCheck(data.id)}
            >
              <Box>{data.text}</Box>
            </Checkbox>
          ))}
        </VStack>
      </Box>
    </Container>
  );
};
export default App;
// https://chakra-ui.com/ css ui
// npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
// npm i @fontsource/noto-sans-kr
