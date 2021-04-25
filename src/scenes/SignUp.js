import { Button, Form, H1, Icon, Input, Item, Text } from 'native-base'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { userStoreContext } from '../contexts'
import { routeNames } from '../navigations/route-names'

export function SignUp({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const userStore = useContext(userStoreContext)

  const handleSignUp = async () => {
    await userStore.signUp(email, password)
    navigation.navigate(routeNames.SignIn, { email, password })
  }

  return (
    <Form style={styles.form}>
      <H1 style={styles.formHeading}>Đăng Ký</H1>

      <Item rounded style={styles.formItem}>
        <Input
          textContentType="emailAddress"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </Item>
      <Item rounded error={password.length < 8} style={styles.formItem}>
        <Input
          textContentType="password"
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
        />
        {password.length < 8 && <Icon name="close-circle" />}
      </Item>
      <Item rounded error={passwordConfirmation !== password} style={styles.formItem}>
        <Input
          textContentType="password"
          placeholder="Xác nhận lại mật khẩu"
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
        />
        {passwordConfirmation !== password && <Icon name="close-circle" />}
      </Item>

      <Button full rounded onPress={handleSignUp} style={styles.formItem}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </Button>

      <Text
        onPress={() => navigation.navigate(routeNames.SignIn)}
        style={styles.formItem}
      >
        Đã có tài khoản?&nbsp;
        <Text style={{ textDecorationLine: 'underline' }}>Đăng nhập</Text>
        &nbsp;ngay
      </Text>
    </Form>
  )
}

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 16,
    paddingVertical: 64,
  },
  formHeading: {
    paddingHorizontal: 16,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  formItem: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  buttonText: {
    fontWeight: 'bold',
  },
})
