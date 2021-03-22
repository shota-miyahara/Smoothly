import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'

import { MyTaskList, TaskTab } from '../render'
import { AppBarSubHeader, ToolTip } from '../../MaterialUi/materialui'
import { readTasks } from '../../../reducks/tasks/operations'
import {
  getDoingTasksLists,
  getCompletedTasksLists,
} from '../../../reducks/tasks/selectors'

import EditIcon from '@material-ui/icons/Edit'
import Fab from '@material-ui/core/Fab'
import Paper from '@material-ui/core/Paper'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
/* ===================================================================== */

const MyTask = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const doingTasks = getDoingTasksLists(selector)
  const completedTasks = getCompletedTasksLists(selector)
  const [state, setState] = useState({
    doing: true,
    completed: true,
  })
  // 自分の未完了のスケジュールを取得
  useEffect(() => {
    dispatch(readTasks())
  }, [])
  // 実行中タスク、実行済みタスク切り替え
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }
  // 連絡作成ボタンクリック
  const pushHandleClick = () => {
    dispatch(push('/task/edit'))
  }

  return (
    <section className="main">
      <AppBarSubHeader subtitle={'タスク管理'} />

      <div className="edit_addbtn">
        <ToolTip title="連絡作成">
          <Fab color="secondary" onClick={pushHandleClick}>
            <EditIcon />
          </Fab>
        </ToolTip>
      </div>

      <div className="contents_style">
        {/* <Paper className="paper_sub">
          <FormControlLabel
          control={
            <Switch
            color="primary"
            checked={state.doing}
            onChange={handleChange}
            name="doing"
            />
          }
          label={state.doing ? '実行中タスク' : '実行済タスク'}
          className="pd_left_10px"
          />
          <MyTaskList
          state={state}
          myTasks={state.doing ? doingTasks : completedTasks}
          />
        </Paper> */}

        <Paper>
          <TaskTab doingTasks={doingTasks} completedTasks={completedTasks} />
        </Paper>
      </div>
    </section>
  )
}
export default MyTask
