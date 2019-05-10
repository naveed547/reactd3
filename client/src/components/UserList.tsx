import * as React from 'react';
interface UserListProps {
    userList: string[];
}

export default function UserList(props: UserListProps) {
    return (
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
            {
                props.userList.map((user, index) => {
                    return (
                        <label key={user} className="btn btn-secondary">
                            <input type="radio" name="userName" required={true} value={user} id={'userid' + index} autoComplete="off" />
                            {user}
                        </label>
                    );
                })
            }
        </div>
    );
}
