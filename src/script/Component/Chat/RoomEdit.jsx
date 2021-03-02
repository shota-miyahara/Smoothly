import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { RoomUserList, RoomCheckedList, IconCropper } from '../render'
import {
  AppBarSubHeader,
  IconUpload,
  BlueButton,
  BlueButtonNomal,
  PinkButton,
  BlueInput,
} from '../../MaterialUi/materialui'
import { db } from '../../../firebase/firebase'
import { createChatRoom, editChatRoom } from '../../../reducks/chats/operations'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
/* ===================================================================== */

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

const RoomEdit = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [rid, setRid] = useState('')
  const [roomName, setRoomName] = useState('')
  const [checked, setChecked] = useState([])
  const [userName, setUserName] = useState([])
  const [expanded, setExpanded] = useState(false)
  const [blob, setBlob] = useState(null)
  const [inputImg, setInputImg] = useState('')

  useEffect(() => {
    // URLからridを取得
    const id = window.location.pathname.split('/chat/edit')[1]
    if (id !== '') {
      setRid(id.split('/')[1])
    }
    // ridが存在すればルーム情報を取得する
    if (rid !== '') {
      db.collection('chats')
        .doc(rid)
        .get()
        .then((snapshot) => {
          const chat = snapshot.data()
          setChecked(chat.members)
          setUserName(chat.members_name)
          setRoomName(chat.room_name)
        })
    }
  }, [rid])
  // クロップデータセットイベント
  const getBlob = (blob) => {
    setBlob(blob)
  }
  // ルーム名入力イベント
  const inputRoomName = useCallback(
    (event) => {
      setRoomName(event.target.value)
    },
    [setRoomName]
  )
  // アコーディオン開閉イベント
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  // 全選択解除ボタンクリック
  const clearHandleClick = () => {
    setChecked([])
    setUserName([])
    setExpanded(false)
  }
  // キャンセルボタンクリック
  const backHandleClick = () => {
    if (rid === '') {
      dispatch(push('/chat'))
      setBlob(null)
      setInputImg('')
    } else {
      dispatch(push('/chat/room/' + rid))
      setBlob(null)
      setInputImg('')
    }
  }
  // 保存ボタンクリック
  const createHandleClick = () => {
    if (rid === '') {
      dispatch(createChatRoom(roomName, userName, checked, blob))
    } else if (rid !== '') {
      dispatch(editChatRoom(rid, roomName, userName, checked, blob))
    }
  }

  return (
    <section className="main">
      {rid ? (
        <AppBarSubHeader subtitle={'ルーム　ー編集ー'} />
      ) : (
        <AppBarSubHeader subtitle={'ルーム　ー作成ー'} />
      )}
      <div className="contents_style">
        <Paper className="paper">
          <Typography className="label">ルームアイコン</Typography>
          <div className="space_15px"></div>
          <div className="image">
            {inputImg === '' ? (
              <IconUpload
                label={'ファイルを選択'}
                fullWidth={false}
                setInputImg={setInputImg}
              />
            ) : (
              <IconCropper getBlob={getBlob} inputImg={inputImg} />
            )}
          </div>
          <div className="space_15px"></div>

          <Typography className="label">ルーム名</Typography>

          <BlueInput
            label={null}
            fullWidth={true}
            required={true}
            multiline={true}
            rows={1}
            type={'text'}
            value={roomName}
            defaultValue={roomName}
            onChange={inputRoomName}
          />
          <div className="space_15px"></div>

          <Typography className="label">選択中のユーザー</Typography>
          <RoomCheckedList
            checked={checked}
            setChecked={setChecked}
            userName={userName}
            setUserName={setUserName}
          />
          <div className="space_10px"></div>

          <div className="flex">
            {checked.length !== 0 && (
              <PinkButton label={'全選択解除'} onClick={clearHandleClick} />
            )}
            <div className="flex_grow"></div>
            <BlueButtonNomal label={'キャンセル'} onClick={backHandleClick} />
            <BlueButton label={'保存'} onClick={createHandleClick} />
          </div>
        </Paper>

        <Paper className="paper margin_top_20px">
          <Typography variant="h6" className="title">
            ユーザー一覧
          </Typography>
          <div className="space_20px"></div>

          {userValue.map((e, index) => (
            <Accordion
              key={e.user_value_name}
              expanded={expanded === index}
              onChange={handleAccordionChange(index)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  {e.user_value_name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <RoomUserList
                  className={e.class_name}
                  classValueName={e.user_value_name}
                  checked={checked}
                  setChecked={setChecked}
                  userName={userName}
                  setUserName={setUserName}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </div>
    </section>
  )
}
export default RoomEdit

const userValue = [
  { user_value_name: '教官', class_name: '教官' },
  { user_value_name: 'PI-11A-172', class_name: 'PI-11A-172' },
  { user_value_name: 'PW-11A-172', class_name: 'PW-11A-172' },
]
