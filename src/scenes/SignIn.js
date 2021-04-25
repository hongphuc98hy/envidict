import { Button, Form, H1, Input, Item, Text } from 'native-base'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native'
import { userStoreContext } from '../contexts'
import { routeNames } from '../navigations/route-names'

export function SignIn({ route, navigation }) {
  const { email: em = '', password: pw = '' } = route.params || {}
  const [email, setEmail] = useState(em)
  const [password, setPassword] = useState(pw)
  const userStore = useContext(userStoreContext)

  const handleSignIn = async () => {
    await userStore.signInWithPassword(email, password)
  }

  return (
    <Form style={styles.form}>
      <H1 style={styles.formHeading}>Đăng Nhập</H1>

      <Item rounded style={styles.formItem}>
        <Input
          textContentType="emailAddress"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </Item>
      <Item rounded style={styles.formItem}>
        <Input
          textContentType="password"
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
        />
      </Item>

      <Button full rounded onPress={handleSignIn} style={styles.formItem}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </Button>

      <Text
        onPress={() => navigation.navigate(routeNames.SignUp)}
        style={styles.formItem}
      >
        Chưa có tài khoản?&nbsp;
        <Text style={{ textDecorationLine: 'underline' }}>Đăng ký</Text>
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
