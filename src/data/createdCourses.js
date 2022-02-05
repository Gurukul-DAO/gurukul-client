// TODO This should get the courses from the blockchain. For now, just return some dummy data so we can display something.

export function getCreatedPublishedCourses(creatorEthAddress) {
    return getCreatedCourses().filter(c => c.status === "published");
}

export function getCreatedPrivateCourses(creatorEthAddress) {
    return getCreatedCourses().filter(c => c.status === "private");
}

function getCreatedCourses() {
    return [
        {
            id: "3c199792-13d5-4567-a8b8-93166d352817",
            name: "Intro to Polygon",
            description: "This course will tell you all you need to know about Polygon.",
            status: "published",
            videos: [
                {
                    id: "f3da7dac-e4a8-4900-8889-13bf2f5dc544",
                    name: "What is Polygon?",
                    youtubeId: "GWUwFDFOipo"
                },
                {
                    id: "627d1fe7-ed41-41c8-aa93-7fbf8f7c1189",
                    name: "Ethereum's Internet of Blockchains",
                    youtubeId: "IijtdpAtOt0"
                },
                {
                    id: "75c95776-0b24-4c8c-bf18-1c0507ae7ea6",
                    name: "Polygon Huge Update",
                    youtubeId: "UrJnAu6mY0Q"
                }
            ]
        },
        {
            id: "fb212f31-85f4-4e7d-8d5b-a15abea31937",
            name: "Intro to Web3",
            description: "What is Web3 and why do I need it? Find out in this course!",
            status: "private",
            videos: [
                {
                    id: "247a03fc-3f65-4de4-944f-024d529515dc",
                    name: "What is Web3?",
                    youtubeId: "nHhAEkG1y2U"
                },
                {
                    id: "2148b4bd-0fca-4410-9524-3b8650d6b1a5",
                    name: "Is Web3 all Hype?",
                    youtubeId: "wHTcrmhskto"
                },
                {
                    id: "ceade2ed-71d6-4fd0-a4e9-3c3f2f95f360",
                    name: "Why Elon Musk hates Web3",
                    youtubeId: "UXoHXG9fmJw"
                },
                {
                    id: "aade0231-2bf2-4d8d-89e7-9b103520d388",
                    name: "Web3: A threat or an opportunity?",
                    youtubeId: "JPGNvKy6DTA"
                }
            ]
        }
    ]
}
