import {screen, render} from "@testing-library/react"
import App, {dataApi} from './App';
import CharacterPopUp from "./components/card";
import {rest} from 'msw';
import {setupServer} from 'msw/node'


const charachterResponse= rest.get(dataApi[0],(req,res,ctx)=>{
    return res(ctx.json([  {
        id: 1,
        name: "Rick Sanchez",
        air_date: "December 2, 2013",
        episode: "S01E01",
        characters: [
          "https://rickandmortyapi.com/api/character/1",
          "https://rickandmortyapi.com/api/character/2",
        ],
        url: "https://rickandmortyapi.com/api/episode/1",
        created: "2017-11-10T12:56:33.798Z"
      }]))
})


const locationResponse= rest.get(dataApi[1],(req,res,ctx)=>{
  return res(ctx.json([  {
    "id": 1,
    "name": "Earth",
    "type": "Planet",
    "dimension": "Dimension C-137",
    "residents": [
      "https://rickandmortyapi.com/api/character/1",
      "https://rickandmortyapi.com/api/character/2",
    ],
    "url": "https://rickandmortyapi.com/api/location/1",
    "created": "2017-11-10T12:42:04.162Z"
  }
    ]))
})

const episodeResponse= rest.get(dataApi[2],(req,res,ctx)=>{
  return res(ctx.json([  {
    "id": 1,
      "name": "Pilot",
      "air_date": "December 2, 2013",
      "episode": "S01E01",
      "characters": [
        "https://rickandmortyapi.com/api/character/1",
        "https://rickandmortyapi.com/api/character/2",
      ],
      "url": "https://rickandmortyapi.com/api/episode/1",
      "created": "2017-11-10T12:56:33.798Z"
    }
    ]))
})

const charErrorResponse = rest.get(dataApi[0], (req, res, ctx) => {
  return res(ctx.status(500));
});
const handlers =[charachterResponse, locationResponse,episodeResponse ]
const server = new setupServer(...handlers);

beforeAll(()=>server.listen());
afterAll(()=>server.resetHandlers());
afterAll(()=>server.close())

test("find Episode", async ()=>{
    render(<CharacterPopUp/>);
    const char = await  screen.findByText((content, node) => {
      const hasText = (node) => node.textContent === "Episodes:";
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node.children).every(
        (child) => !hasText(child)
      );
  
      return nodeHasText && childrenDontHaveText;
    });
    expect(char).toBeVisible();

})

test("it should handle error message from char", async () => {
  server.use(charErrorResponse);
  render(<App />);
  const todoItem = await screen.findByText("Come again later");
  expect(todoItem).toBeVisible();
});
