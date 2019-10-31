import Link from 'next/link'
import {
    Form,
    Select,
    InputNumber,
    DatePicker,
    Switch,
    Slider,
    Button
} from 'antd'
import fetch from 'isomorphic-unfetch'
import { style_antd as style } from '../assets'

const FormItem = Form.Item
const Option = Select.Option


function PostLink(props) {
    return (
        <li>
            <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
                <a>{props.title}</a>
            </Link>
        </li>
    )
}

const Home = (props) => (
    <div>
        <h1 style={{background:'#f00'}}>Batman TV Shows</h1>
        <div className={style.aa}>
            haha
        </div>
        <ul>
            {props.shows.map(show => (
                <li key={show.id}>
                    <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                        <a>{show.name}</a>
                    </Link>
                </li>
            ))}
        </ul>
        <div style={{ marginTop: 100 }}>
            <ul>
                <PostLink id="next-js" title="Hello Next.js" />
                <PostLink id="learn-nextjs" title="Learn Next.js is awesome" />
                <PostLink id="deploy-nextjs" title="Deploy apps with Zeit" />
            </ul>

            <Form layout='horizontal'>
                <FormItem
                    label='Input Number'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                >
                    <InputNumber
                        size='large'
                        min={1}
                        max={10}
                        style={{ width: 100 }}
                        defaultValue={3}
                        name='inputNumber'
                    />
                    <a href='#'>Link</a>
                </FormItem>

                <FormItem label='Switch' labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
                    <Switch defaultChecked name='switch' />
                </FormItem>

                <FormItem label='Slider' labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
                    <Slider defaultValue={70} />
                </FormItem>

                <FormItem label='Select' labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
                    <Select
                        size='large'
                        defaultValue='lucy'
                        style={{ width: 192 }}
                        name='select'
                    >
                        <Option value='jack'>jack</Option>
                        <Option value='lucy'>lucy</Option>
                        <Option value='disabled' disabled>
                            disabled
                        </Option>
                        <Option value='yiminghe'>yiminghe</Option>
                    </Select>
                </FormItem>

                <FormItem
                    label='DatePicker'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                >
                    <DatePicker name='startDate' />
                </FormItem>
                <FormItem style={{ marginTop: 48 }} wrapperCol={{ span: 8, offset: 8 }}>
                    <Button size='large' type='primary' htmlType='submit'>
                        OK
                    </Button>
                    <Button size='large' style={{ marginLeft: 8 }}>
                        Cancel
                    </Button>
                </FormItem>
            </Form>
        </div>
    </div>
)

Home.getInitialProps = async function() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()

    console.log(`Show data fetched. Count: ${data.length}`)

    return {
        shows: data.map(entry => entry.show)
    }
}

export default Home