const sidebarTree = (title = 'About') => ({
    '/code/': [
        {
            'title':       'models',
            'collapsable': true,
            'children':    [
                'models/PitchClass',
                'models/Note',
                'models/MusicalPattern',
                'models/Chord',
                'models/Scale',
                'models/GuitarChordPattern',
                'models/Driver',
            ],
        },
        {
            'title':       'notation',
            'collapsable': true,
            'children':    [
                'notation/Measure',
                'notation/Score',
                'notation/ScoreHandler',
            ],
        },
        {
            'title':       'instruments',
            'collapsable': true,
            'children':    [
                'instruments/Instrument',
                'instruments/Piano',
                'instruments/Guitar',
                'instruments/Drumset',
            ],
        },
        {
            'title':       'utilities',
            'collapsable': true,
            'children':    [
                'utilities/ScientificFunctions',
                'utilities/MusicFunctions',
                'utilities/GeneralFunctions',
            ],
        },
        {
            'title':       'mixins',
            'collapsable': true,
            'children':    [
                'mixins/Instruments',
            ],
        },
        {
            'title':       'resources',
            'collapsable': true,
            'children':    [
                'resources/MusicTheoryStructures',
            ],
        },
    ],
})


module.exports = {
    contentLoading: true,
    title:          'Note-Art API',
    description:    'The API for Note-Art JS',
    locales:        {
        '/': {
            title:       'Note-Art JS',
            description: 'Music Theory in code',
        },
    },
    themeConfig:    {
        sidebarDepth: 0,
        repo:         'seanitzel/note-art',
        locales:      {
            '/': {
                nav:     [
                    {
                        text: 'Home',
                        link: '/',
                    },
                    {
                        text: 'Demo',
                        link: 'https://note-art-demo.netlify.com/',
                    },
                ],
                // Add the generated sidebar
                sidebar: {
                    ...sidebarTree(),
                },
            },
        },
    },
}
