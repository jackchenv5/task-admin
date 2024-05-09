//重点缺陷分布
export const bugData = [
  {
    name: '攻关',
    value: 100,
    group: [
      {
        name: '全项目',
        value: 100,
        members: [
          { name: '陈成F', value: 20 },
          { name: '乔志', value: 15 },
          { name: '王俊坤', value: 12 },
          { name: '张世伟', value: 10 },
          { name: '陈成adF', value: 8 },
          { name: '乔志asd', value: 6 },
          { name: '王俊坤ads', value: 4 },
          { name: '张世伟ads', value: 2 },
        ],
      },
      {
        name: '测试处1',
        value: 80,
        members: [
          { name: '陈成', value: 30 },
          { name: '乔志', value: 25 },
          { name: '王坤', value: 22 },
          { name: '张伟', value: 10 },
          { name: '陈成dF', value: 8 },
          { name: '乔志sd', value: 6 },
          { name: '王俊坤ds', value: 4 },
          { name: '张世ads', value: 2 },
        ],
      },
      {
        name: '测试处2',
        value: 70,
        members: [],
      },
      {
        name: '测试处3',
        value: 60,
        members: [],
      },
      {
        name: '测试部',
        value: 50,
        members: [],
      },
      {
        name: '测试效能小组',
        value: 40,
        members: [],
      },
      {
        name: '测试工具小组',
        value: 20,
      },
    ],
  },
  {
    name: '阻塞',
    value: 80,
    group: [
      {
        name: '全项目',
        value: 500,
        members: [
          { name: '陈成F', value: 20 },
          { name: '乔志', value: 15 },
          { name: '王俊坤', value: 12 },
          { name: '张世伟', value: 10 },
          { name: '陈成Fds', value: 8 },
          { name: '乔', value: 6 },
          { name: '王坤', value: 4 },
          { name: '张伟', value: 2 },
        ],
      },
      {
        name: '测试处1',
        value: 180,
        members: [],
      },
      {
        name: '测试处2',
        value: 120,
        members: [],
      },
      {
        name: '测试处3',
        value: 100,
        members: [],
      },
      {
        name: '测试部',
        value: 80,
        members: [],
      },
      {
        name: '测试效能小组',
        value: 60,
        members: [],
      },
      {
        name: '测试工具小组',
        value: 20,
      },
    ],
  },
  {
    name: '不易重现',
    value: 60,
    group: [
      {
        name: '全项目',
        value: 300,
        members: [
          { name: '陈成F', value: 20 },
          { name: '乔志', value: 15 },
          { name: '王俊坤', value: 12 },
          { name: '张世伟', value: 10 },
          { name: '陈成F', value: 8 },
          { name: '乔志', value: 6 },
          { name: '王俊坤', value: 4 },
          { name: '张世伟', value: 2 },
        ],
      },
      {
        name: '测试处1',
        value: 180,
        members: [
          { name: 'xxF', value: 40 },
          { name: 'ddd', value: 25 },
          { name: 'asdfa', value: 12 },
          { name: '张世伟', value: 10 },
          { name: '陈成F', value: 8 },
          { name: '乔志', value: 6 },
          { name: '王俊坤', value: 4 },
          { name: '张世伟', value: 2 },
        ],
      },
      {
        name: '测试处2',
        value: 70,
        members: [],
      },
      {
        name: '测试处3',
        value: 60,
        members: [],
      },
      {
        name: '测试部',
        value: 50,
        members: [],
      },
      {
        name: '测试效能小组',
        value: 40,
        members: [],
      },
      {
        name: '测试工具小组',
        value: 20,
      },
    ],
  },
  {
    name: '严重',
    value: 50,
    group: [
      {
        name: '全项目',
        value: 100,
        members: [
          { name: '陈成F', value: 20 },
          { name: '乔志', value: 15 },
          { name: '王俊坤', value: 12 },
          { name: '张世伟', value: 10 },
          { name: '陈成F', value: 8 },
          { name: '乔志', value: 6 },
          { name: '王俊坤', value: 4 },
          { name: '张世伟', value: 2 },
        ],
      },
      {
        name: '测试处1',
        value: 80,
        members: [],
      },
      {
        name: '测试处2',
        value: 70,
        members: [],
      },
      {
        name: '测试处3',
        value: 60,
        members: [],
      },
      {
        name: '测试部',
        value: 50,
        members: [],
      },
      {
        name: '测试效能小组',
        value: 40,
        members: [],
      },
      {
        name: '测试工具小组',
        value: 20,
      },
    ],
  },
];

//遗留缺陷分布
export const bugRemainData = [
  {
    name: '缺陷总数',
    value: 500,
    fix: 5,
    group: [
      {
        name: '全项目',
        value: 180,
        fix: 8,
        members: [
          { name: '陈成F', value: 20, fix: 2 },
          { name: '乔志', value: 15, fix: 2 },
          { name: '王俊坤', value: 12, fix: 2 },
          { name: '张世伟', value: 10, fix: 2 },
          { name: '陈成F', value: 8, fix: 2 },
          { name: '乔志', value: 6, fix: 2 },
          { name: '王俊坤', value: 4, fix: 2 },
          { name: '张世伟', value: 2, fix: 2 },
        ],
      },
      {
        name: '测试处1',
        value: 80,
        fix: 8,
        members: [],
      },
      {
        name: '测试处2',
        fix: 8,
        value: 70,
        members: [],
      },
      {
        name: '测试处3',
        value: 60,
        fix: 8,
        members: [],
      },
      {
        name: '测试部',
        value: 50,
        fix: 8,
        members: [],
      },
      {
        name: '测试效能小组',
        value: 40,
        fix: 8,
        members: [],
      },
      {
        name: '测试工具小组',
        value: 20,
        fix: 8,
        members: [],
      },
    ],
  },
  {
    name: '遗留总数',
    value: 200,
    fix: 8,
    group: [
      {
        name: '全项目',
        value: 280,
        fix: 5,
        members: [
          { name: '陈成F', value: 20, fix: 2 },
          { name: '乔志', value: 15, fix: 2 },
          { name: '王俊坤', value: 12, fix: 2 },
          { name: '张世伟', value: 10, fix: 2 },
          { name: '陈成F', value: 8, fix: 2 },
          { name: '乔志', value: 6, fix: 2 },
          { name: '王俊坤', value: 4, fix: 2 },
          { name: '张世伟', value: 2, fix: 2 },
        ],
      },
      {
        name: '测试处1',
        value: 80,
        fix: 5,
        members: [],
      },
      {
        name: '测试处2',
        value: 70,
        fix: 5,
        members: [],
      },
      {
        name: '测试处3',
        value: 60,
        fix: 8,
        members: [],
      },
      {
        name: '测试部',
        value: 50,
        fix: 5,
        members: [],
      },
      {
        name: '测试效能小组',
        value: 40,
        fix: 5,
        members: [],
      },
      {
        name: '测试工具小组',
        value: 20,
        fix: 5,
        members: [],
      },
    ],
  },
  {
    name: '遗留1月以上',
    value: 50,
    group: [],
  },
  {
    name: '遗留2周~1月',
    value: 100,
    group: [],
  },
  {
    name: '遗留1~2周',
    value: 50,
    type: 'solved',
    group: [],
  },
  {
    name: '遗留0~1周',
    value: 30,
    type: 'solved',
    group: [],
  },
];

//带测试缺陷分布
export const bugToTestData = [
  {
    name: '缺陷总数',
    value: 500,
    fix: 8,
    group: [
      {
        name: '全项目',
        fix: 8,
        value: 330,
        members: [
          { name: '陈成F', value: 20, fix: 2 },
          { name: '乔志', value: 15, fix: 2 },
          { name: '王俊坤', value: 12, fix: 2 },
          { name: '张世伟', value: 10, fix: 2 },
          { name: '陈成F', value: 8, fix: 2 },
          { name: '乔志', value: 6, fix: 2 },
          { name: '王俊坤', value: 4, fix: 2 },
          { name: '张世伟', value: 2, fix: 2 },
        ],
      },
      {
        name: '测试处2',
        value: 70,
        fix: 8,
        members: [],
      },
      {
        name: '测试处3',
        value: 60,
        fix: 8,
        members: [],
      },
      {
        name: '测试部',
        value: 50,
        fix: 8,
        members: [],
      },
      {
        name: '测试效能小组',
        value: 40,
        fix: 8,
        members: [],
      },
      {
        name: '测试工具小组',
        value: 20,
        fix: 8,
        members: [],
      },
    ],
  },
  {
    name: '带测试总数',
    value: 300,
    group: [
      {
        name: '全项目',
        value: 430,
        members: [
          { name: '陈F', value: 120 },
          { name: '乔志', value: 15 },
          { name: '王俊坤', value: 12 },
          { name: '张世伟', value: 10 },
          { name: '陈成F', value: 8 },
          { name: '乔志', value: 6 },
          { name: '王俊坤', value: 4 },
          { name: '张世伟', value: 2 },
        ],
      },
      {
        name: '测试处2',
        value: 70,
        members: [],
      },
      {
        name: '测试处3',
        value: 60,
        members: [],
      },
      {
        name: '测试部',
        value: 50,
        members: [],
      },
      {
        name: '测试效能小组',
        value: 40,
        members: [],
      },
      {
        name: '测试工具小组',
        value: 20,
        members: [],
      },
    ],
  },
  {
    name: '1月前转为待测试',
    value: 100,
    group: [],
  },
  {
    name: '1周~1月转为待测试',
    value: 100,
    group: [],
  },
  {
    name: '最近1周转为待测试',
    value: 20,
    type: 'solved',
    group: [],
  },
];

//解决缺陷分布
export const bugSolvedData = [
  {
    name: '缺陷总数',
    value: 500,
    group: [
      {
        name: '全项目',
        value: 330,
        members: [
          { name: '陈成F', value: 20 },
          { name: '乔志', value: 15 },
          { name: '王俊坤', value: 12 },
          { name: '张世伟', value: 10 },
          { name: '陈成F', value: 8 },
          { name: '乔志', value: 6 },
          { name: '王俊坤', value: 4 },
          { name: '张世伟', value: 2 },
        ],
      },
      {
        name: '测试处2',
        value: 70,
        members: [],
      },
      {
        name: '测试处3',
        value: 60,
        members: [],
      },
      {
        name: '测试部',
        value: 50,
        members: [],
      },
      {
        name: '测试效能小组',
        value: 40,
        members: [],
      },
      {
        name: '测试工具小组',
        value: 20,
        members: [],
      },
    ],
  },
  {
    name: '解决总数',
    value: 200,
    group: [
      {
        name: '全项目',
        value: 430,
        members: [
          { name: '陈F', value: 120 },
          { name: '乔志', value: 15 },
          { name: '王俊坤', value: 12 },
          { name: '张世伟', value: 10 },
          { name: '陈成F', value: 8 },
          { name: '乔志', value: 6 },
          { name: '王俊坤', value: 4 },
          { name: '张世伟', value: 2 },
        ],
      },
      {
        name: '测试处2',
        value: 70,
        members: [],
      },
      {
        name: '测试处3',
        value: 60,
        members: [],
      },
      {
        name: '测试部',
        value: 50,
        members: [],
      },
      {
        name: '测试效能小组',
        value: 40,
        members: [],
      },
      {
        name: '测试工具小组',
        value: 20,
        members: [],
      },
    ],
  },
  {
    name: '1月以前转为已解决',
    value: 100,
    group: [],
  },
  {
    name: '1周~1月转为已解决',
    value: 100,
    group: [],
  },
  {
    name: '最近1周转为已解决',
    value: 20,
    type: 'solved',
    group: [],
  },
];

//修复时间
export const bugFixData = [
  {
    name: '全项目',
    value: 380,
    members: [
      { name: '陈成F', value: 120 },
      { name: '乔志', value: 85 },
      { name: '王俊坤', value: 42 },
      { name: '张世伟', value: 30 },
      { name: '陈r成F', value: 8 },
      { name: '乔', value: 6 },
      { name: '王坤', value: 4 },
      { name: '张伟', value: 2 },
    ],
  },
  {
    name: '测试处1',
    value: 80,
    members: [
      { name: '陈成F', value: 20 },
      { name: '乔志', value: 15 },
      { name: '王俊坤', value: 12 },
      { name: '张世伟', value: 10 },
      { name: '陈成F', value: 8 },
      { name: '乔志', value: 6 },
      { name: '王俊坤', value: 4 },
      { name: '张世伟', value: 2 },
    ],
  },
  {
    name: '测试处2',
    value: 70,
  },
  {
    name: '测试处3',
    value: 60,
  },
  {
    name: '测试部',
    value: 50,
  },
  {
    name: '测试效能小组',
    value: 40,
  },
  {
    name: '测试工具小组',
    value: 20,
  },
];

export const bugSummary = [
  { name: '解决', value: 300, itemStyle: { color: 'rgb(56,106,162)' } },
  { name: '遗留', value: 200, itemStyle: { color: 'rgb(243,144,144)' } },
  { name: '', value: 60000, itemStyle: { color: 'rgb(255,255,255)' } },
];

export const bugDisData = {
  all: [
    { name: '用例发现', value: 500 },
    { name: '自动化发现', value: 400 },
    { name: '探索发现', value: 300 },
    { name: '测试方案发现', value: 200 },
    { name: '专项测试发现', value: 100 },
  ],
  sysTest: [
    { name: '用例发现', value: 200 },
    { name: '自动化发现', value: 100 },
    { name: '探索发现', value: 100 },
    { name: '测试方案发现', value: 80 },
    { name: '专项测试发现', value: 50 },
  ],
  integrationTest: [
    { name: '用例发现', value: 100 },
    { name: '自动化发现', value: 50 },
    { name: '探索发现', value: 40 },
    { name: '测试方案发现', value: 30 },
    { name: '专项测试发现', value: 20 },
  ],
};

export const bugModuleData = [
  {
    name: '全项目',
    all: 500,
    remain: 300,
    data: [
      { name: '04.4.1(1周)', all: 200, solved: 100 },
      { name: '04.4.8(2周)', all: 100, solved: 80 },
      { name: '04.4.15(3周)', all: 80, solved: 60 },
      { name: '04.4.22(4周)', all: 60, solved: 40 },
      { name: '04.4.29(5周)', all: 40, solved: 30 },
      { name: '04.5.1(6周)', all: 30, solved: 20 },
      { name: '04.5.3(7周)', all: 20, solved: 10 },
      { name: '04.4.10(8周)', all: 10, solved: 10 },
    ],
  },
  { name: 'adpter', all: 400, remain: 200, data: [] },
  { name: 'fib', all: 300, remain: 100, data: [] },
  { name: 'ssh', all: 200, remain: 80, data: [] },
  { name: 'driver', all: 100, remain: 30, data: [] },
  { name: 'ftp', all: 80, remain: 20, data: [] },
  {
    name: 'command',
    all: 60,
    remain: 600,
    data: [
      { name: '第1周', all: 200, solved: 10 },
      { name: '第2周', all: 100, solved: 80 },
      { name: '第3周', all: 80, solved: 60 },
      { name: '第4周', all: 60, solved: 40 },
      { name: '第5周', all: 40, solved: 80 },
      { name: '第6周', all: 30, solved: 120 },
      { name: '第7周', all: 20, solved: 90 },
      { name: '第8周', all: 10, solved: 20 },
    ],
  },
];

export const bugTrendData = [
  {
    name: '周',
    value: 250,
    all: [
      20, 24, 35, 49, 60, 90, 130, 130, 90, 40, 40, 40, 44, 40, 88, 110, 40, 49, 52, 70, 100, 120,
      80, 50, 20, 30, 100, 80, 50,
    ],
    remain: [
      1, 2, 3, 4, 10, 10, 20, 10, 3, 4, 5, 8, 12, 10, 8, 5, 2, 3, 8, 5, 2, 3, 4, 5, 8, 12, 10, 8, 5,
    ],
    solved: [
      10, 20, 30, 40, 50, 80, 120, 100, 80, 50, 20, 30, 40, 50, 80, 120, 30, 40, 50, 80, 120, 100,
      80, 50, 20, 30, 100, 80, 50,
    ],
    schedule: [
      30, 40, 50, 80, 120, 30, 40, 50, 80, 120, 100, 80, 50, 20, 30, 100, 80, 50, 10, 20, 30, 40,
      50, 80, 120, 100, 80, 50, 20,
    ],
  },
  {
    name: '月',
    value: 1000,
    all: [
      10, 20, 30, 40, 50, 80, 120, 100, 80, 50, 20, 30, 40, 50, 80, 120, 100, 80, 30, 40, 50, 80,
      120, 100, 80, 50, 20, 30, 50,
    ],
    remain: [
      10, 20, 30, 40, 50, 80, 120, 100, 30, 40, 50, 80, 120, 100, 80, 50, 20, 30, 80, 50, 20, 30,
      40, 50, 80, 120, 100, 80, 50,
    ],
    solved: [
      10, 20, 30, 40, 50, 80, 30, 40, 50, 80, 120, 100, 80, 50, 20, 30, 120, 100, 80, 50, 20, 30,
      40, 50, 80, 120, 100, 80, 50,
    ],
    schedule: [
      30, 40, 50, 80, 120, 30, 40, 50, 80, 120, 100, 80, 50, 20, 30, 100, 80, 50, 10, 20, 30, 40,
      50, 80, 120, 100, 80, 50, 20,
    ],
  },
];

export const filterInfo = [
  { name: '缺陷分布', value: '公关缺陷' },
  { name: '小组', value: '工具组' },
  { name: '人员', value: '陈成F' },
];

export const remainTrendData = {
  all: {
    name: '总项目',
    //风险系数：最近四周（进入-解决）和 /4：遗留趋势
    risk: 35,
    remian: 200,
    data: [
      { name: '最近一周', in: 100, out: 80 },
      { name: '最近二周', in: 120, out: 90 },
      { name: '最近三周', in: 80, out: 60 },
      { name: '最近四周', in: 120, out: 90 },
    ],
  },
  group: [
    {
      name: 'SSP处',
      //风险系数：最近四周（进入-解决）和 /4：遗留趋势
      risk: 25,
      remian: 25,
      data: [
        { name: '最近一周', in: 100, out: 80 },
        { name: '最近二周', in: 120, out: 90 },
        { name: '最近三周', in: 80, out: 60 },
        { name: '最近四周', in: 120, out: 90 },
      ],
    },
    {
      name: '测试处1',
      risk: 12.5,
      remian: 30,
      data: [
        { name: '最近一周', in: 100, out: 80 },
        { name: '最近二周', in: 120, out: 130 },
        { name: '最近三周', in: 80, out: 70 },
        { name: '最近四周', in: 120, out: 90 },
      ],
    },
    {
      name: '测试处2',
      risk: 12.5,
      remian: 30,
      data: [
        { name: '最近一周', in: 100, out: 80 },
        { name: '最近二周', in: 120, out: 130 },
        { name: '最近三周', in: 80, out: 70 },
        { name: '最近四周', in: 120, out: 90 },
      ],
    },
    {
      name: '测试处2',
      risk: 12.5,
      remian: 30,
      data: [
        { name: '最近一周', in: 100, out: 80 },
        { name: '最近二周', in: 120, out: 130 },
        { name: '最近三周', in: 80, out: 70 },
        { name: '最近四周', in: 120, out: 90 },
      ],
    },
  ],
};
