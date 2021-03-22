import React, { useState, useEffect } from 'react'
import { push } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'

import { ActionCheckDialog } from '../render'
import { db } from '../../../firebase/firebase'
import { getUserId } from '../../../reducks/users/selectors'
import {
  AppBarSubHeader,
  BlueButton,
  PinkButton,
} from '../../MaterialUi/materialui'
import { signOut } from '../../../reducks/users/operations'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Avatar } from '@material-ui/core'
/* ===================================================================== */
const useStyles = makeStyles((theme) => ({
  icon: {
    margin: '0 5px 0 10px',
    border: '4px solid #90caf9',
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: 30,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      marginRight: 80,
    },
  },
  flex: {
    display: 'block',
    padding: '25px 0',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
}))

const Setting = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const current_uid = getUserId(selector)
  const [prof, setProf] = useState('')
  const [icon, setIcon] = useState('')
  const [mail, setMail] = useState('')
  const [openCheckDialog, setOpenCheckDialog] = useState(false)

  // サインアウトボタンクリック
  const signOutHandleClick = () => {
    setOpenCheckDialog(false)
    dispatch(signOut())
  }
  // 確認ダイアログ表示
  const checkHandleClick = () => {
    setOpenCheckDialog(true)
  }
  // ユーザー情報を取得
  useEffect(() => {
    db.collection('users')
      .doc(current_uid)
      .get()
      .then((snapshots) => {
        const userData = snapshots.data()
        setMail(userData.email)
        setIcon(userData.icon.path)
        if (userData.prof !== '') {
          setProf(userData.prof)
        }
      })
  }, [])

  return (
    <section className="main">
      <AppBarSubHeader subtitle={'設定'} />

      <div className="contents_style">
        <Paper className="paper mg_btm_20px">
          <Typography variant="h6" className="title_underline">
            プロフィール
          </Typography>
          <div className={classes.flex}>
            <div>
              <Typography variant="body2" className="label pd_btm_10px">
                アイコン
              </Typography>
              <Avatar className={classes.icon} src={icon} />
            </div>
            <div>
              <Typography variant="body2" className="label pd_y_10px">
                自己紹介文
              </Typography>
              <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                {prof !== '' ? prof : 'プロフィールを登録しましょう！'}
              </Typography>
            </div>
          </div>
          <div className="right pd_top_10px">
            <BlueButton
              label={'編集'}
              onClick={() => dispatch(push('/setting/prof'))}
            />
          </div>
        </Paper>

        <Paper className="paper mg_btm_20px">
          <Typography variant="h6" className="title_underline">
            メールアドレス・パスワード
          </Typography>
          <Typography variant="body2" className="label pd_top_10px">
            登録中のメールアドレス
          </Typography>
          <Typography variant="body1" className="pd_top_10px">
            {mail}
          </Typography>
          <div className="right">
            <BlueButton
              label={'変更'}
              onClick={() => dispatch(push('/setting/auth'))}
            />
          </div>
        </Paper>

        <Paper className="paper mg_btm_20px">
          <Typography variant="h6" className="title_underline">
            サインアウト
          </Typography>
          <div className="right pd_top_10px">
            <BlueButton label={'サインアウト'} onClick={checkHandleClick} />
          </div>
        </Paper>

        <Paper className="paper mg_btm_20px">
          <Typography variant="h6" className="title_underline">
            退会
          </Typography>
          <div className="right pd_top_10px">
            <PinkButton
              label={'退会手続きへ'}
              onClick={() => dispatch(push('/setting/delete'))}
            />
          </div>
        </Paper>
      </div>

      <ActionCheckDialog
        text={'サインアウトしてもよろしいですか？'}
        buttonLabel={'サインアウト'}
        openDialog={openCheckDialog}
        setOpenDialog={setOpenCheckDialog}
        actionHandleClick={signOutHandleClick}
      />
    </section>
  )
}
export default Setting