# React Notifications


## Installation

```
  $ yarn add git+ssh://git@tree.mn:vipul.s/react-notifications.git
```

## Usage

### Import the Notification

```
import { Notification } from 'react-notifications';
```

### Inside the app container place the Notification Tag

```
render() {
    return (
      <div>
        <Notification />
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
```

### Import notify wherever notification is created

```
  import { notify } from 'react-notifications';
```

### Using the notify function

```
  <button onClick={()=> notify('notification text body', 'success')}>click me</button>
  <button onClick={()=> notify('notification text body', 'warning')}>click me</button>
  <button onClick={()=> notify('notification text body', 'danger')}>click me</button>
  <button onClick={()=> notify('notification text body', 'info')}>click me</button>
```