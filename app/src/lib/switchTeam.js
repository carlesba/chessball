import { TEAM_A, TEAM_B } from 'src/constants'

export default function switchTeam (team) {
  return team !== TEAM_A ? TEAM_A : TEAM_B
}
