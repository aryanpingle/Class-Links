raw = {
    "Econometric Methods Tutorial": {
        "id": "ECON F241",
        "time": "M8-9",
        "link": ""
    },
    "Macro Economics": {
        "id": "ECON F243",
        "time": "MWF11-12",
        "link": "gpy-sjvi-qdr"
    },
    "Optimization": {
        "id": "MATH F212",
        "time": "MWF12-1",
        "link": "ohn-bhzn-kwx"
    },
    "SAPM": {
        "id": "ECON F412",
        "time": "MWF4-5",
        "link": ""
    },
    "POM": {
        "id": "MGTS F211",
        "time": "TuThS9-10",
        "link": ""
    },
    "Econometric Methods": {
        "id": "ECON F241",
        "time": "TuThS10-11",
        "link": ""
    },
    "Economic Growth and Development": {
        "id": "ECON F244",
        "time": "TuThS11-12",
        "link": "xfe-oqnn-dbp"
    },
    "Micro Economics": {
        "id": "ECON F242",
        "time": "Tu3-4,WF10-11",
        "link": ""
    },
    "BAAV": {
        "id": "ECON F355",
        "time": "Tu5-6,WF3-4",
        "link": ""
    },
    "Macro Economics Tutorial": {
        "id": "ECON F243",
        "time": "Th2-3",
        "link": "kqo-fvor-aae"
    },
    "Economic Growth and Development Tutorial": {
        "id": "ECON F244",
        "time": "Th4-5",
        "link": "pyx-vxem-uuk"
    }
}

import json
import re

src = open("main.js", encoding='utf-8').read()
src = re.sub(r'(?<=// Schedule\n).*?(?=\n)', f'var schedule = {json.dumps(raw)}', src, count=1, flags=re.DOTALL)
open("main.js", 'w', encoding='utf-8').write(src)