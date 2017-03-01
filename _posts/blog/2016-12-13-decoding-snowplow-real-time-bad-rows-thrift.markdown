---
layout: post
title: "Decoding Snowplow real-time bad rows (Thrift)"
date: 2016-12-13 16:54:46
author: Mike Robins
categories:
- blog
- Infrastructure
img: snowplow-data-processing-bad-bucket-flow-chart-cropped.png
thumb: thumb01.jpg
---

In this tutorial we’ll look at decoding the bad rows data that comes out of Snowplow real time. In the real time pipeline bad rows that are inserted into Elasticsearch (and S3) are stored as base64’d binary serialized Thrift records. We’ll walk step by step the instructions in Python as to how to first decode, and then deserialize these records.

You can find the code for this tutorial without the accompanying text on [Github](https://gist.github.com/miike/6507b4bb88bb88877843d312c229063b).

Before we start you’ll need 3 things.

1. A copy of Python 3
2. The `thriftpy` library which can be installed using `pip install thriftpy`
3. A local copy of the [Snowplow Analytics collector payload thrift] file(https://github.com/snowplow/snowplow/blob/master/2-collectors/thrift-schemas/collector-payload-1/src/main/thrift/collector-payload.thrift)

If you’re running real-time you can either take a sample payload from your Elasticsearch index (the line property) from a record in bad rows - otherwise we’ll use a sample event I’ve generated below.

```
import base64
import thriftpy
from thriftpy.protocol import TCyBinaryProtocolFactory
from thriftpy.utils import deserialize, serialize
```

First up we’ll import the libraries we need. base64 is part of the standard library and the `thriftpy` imports are from the thriftpy library which has been installed above. Let’s define our example payload below.

```
sample_payload = "CwFAAAAAAi9pCwBkAAAACTEyNy4wLjAuMQoAyAAAAVjbnjdoC3ppAAAAQWlnbHU6Y29tLnNub3dwbG93YW5hbHl0aWNzLnNub3dwbG93L0NvbGxlY3RvclBheWxvYWQvdGhyaWZ0LzEtMC0wCwFKAAABaHN0bT0xNDgxMTUzMzI5MDAwJmU9cHYmdXJsPWh0dHAlM0ElMkYlMkZzbm93Zmxha2UtYW5hbHl0aWNzLmNvbSZ0dj1qcy0yLjYuMCZ0bmE9anMtMy42LjAmYWlkPXNub3dmbGFrZSZwPXdlYiZ0ej1BdXN0cmFsaWElMkZTeWRuZXkmbGFuZz1lbi1BVSZjcz1VVEYtOCZyZXM9MzYweDY0MCZjZD0zMiZjb29raWU9MSZlaWQ9YzI1OWMyNWUtZjk0Yi00ZDJjLWExMWMtMGQyNzhjMmU2ZDFhJmR0bT0xNDc5OTI3ODU3MjAxJnZwPTB4LTU2JmRzPTIwMHgyNjI5NSZ2aWQ9NCZzaWQ9N2ZiOTdmQzYtNmUwZi00MDIyLWFkYmQtMDE3NDMxNTIwZGRiJmR1aWQ9NGQxMGQzZDAtYzJiNC00NzNlLWE0ODMtODEyNzk5ZTgyNGQxJmZwPTEyOTExMjMzMgsBLAAAAG1Nb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXT1c2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzU0LjAuMjg0MC43MSBTYWZhcmkvNTM3LjM2CwGQAAAAIWNvbGxlY3Rvci5zbm93Zmxha2UtYW5hbHl0aWNzLmNvbQsA0gAAAAVVVEYtOAsBNgAAAB9odHRwczovL3Nub3dmbGFrZS1hbmFseXRpY3MuY29tCwGaAAAAJDRkMTBkM2QwLWMyYjQtNDczZS1hNDgzLTgxMjc5OWU4MjRkMQsA3AAAABFzc2MtMC43LjAta2luZXNpcw8BXgsAAAALAAAAJ0hvc3Q6IGNvbGxlY3Rvci5zbm93Zmxha2UtYW5hbHl0aWNzLmNvbQAAAB1BY2NlcHQ6IGltYWdlL3dlYnAsICovKjtxPTAuOAAAACRBY2NlcHQtRW5jb2Rpbmc6IGd6aXAsIGRlZmxhdGUsIHNkY2gAAAA3QWNjZXB0LUxhbmd1YWdlOiBlbi1BVSwgZW47cT0wLjgsIGVuLVVTO3E9MC42LCBlbjtxPTAuNAAAABRDb29raWU6IHNwPWFiY2QtMTIzNAAAACdSZWZlcmVyOiBodHRwOi8vc25vd2ZsYWtlLWFuYWx5dGljcy5jb20AAAB6VXNlci1BZ2VudDogIE1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdPVzY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNTQuMC4yODQwLjcxIFNhZmFyaS81MzcuMzYAAAAaWC1Gb3J3YXJkZWQtRm9yOiAxMjcuMC4wLjEAAAAVWC1Gb3J3YXJkZWQtUG9ydDogNDQzAAAAGFgtRm9yd2FyZGVkLVByb3RvOiBodHRwcwAAABZDb25uZWN0aW9uOiBrZWVwLWFsaXZlAA=="
```

Now let’s use the b64decode method to decode the payload.

```
decoded_payload = base64.b64decode(sample_payload)
print(decoded_payload)

b"\x0b\x01@\x00\x00\x00\x02/i\x0b\x00d\x00\x00\x00\t127.0.0.1\n\x00\xc8\x00\x00\x01X\xdb\x9e7h\x0bzi\x00\x00\x00Aiglu:com.snowplowanalytics.snowplow/CollectorPayload/thrift/1-0-0\x0b\x01J\x00\x00\x01hstm=1481153329000&e=pv&url=http%3A%2F%2Fsnowflake-analytics.com&tv=js-2.6.0&tna=js-3.6.0&aid=snowflake&p=web&tz=Australia%2FSydney&lang=en-AU&cs=UTF-8&res=360x640&cd=32&cookie=1&eid=c259c25e-f94b-4d2c-a11c-0d278c2e6d1a&dtm=1479927857201&vp=0x-56&ds=200x26295&vid=4&sid=7fb97fC6-6e0f-4022-adbd-017431520ddb&duid=4d10d3d0-c2b4-473e-a483-812799e824d1&fp=129112332\x0b\x01,\x00\x00\x00mMozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36\x0b\x01\x90\x00\x00\x00!collector.snowflake-analytics.com\x0b\x00\xd2\x00\x00\x00\x05UTF-8\x0b\x016\x00\x00\x00\x1fhttps://snowflake-analytics.com\x0b\x01\x9a\x00\x00\x00$4d10d3d0-c2b4-473e-a483-812799e824d1\x0b\x00\xdc\x00\x00\x00\x11ssc-0.7.0-kinesis\x0f\x01^\x0b\x00\x00\x00\x0b\x00\x00\x00'Host: collector.snowflake-analytics.com\x00\x00\x00\x1dAccept: image/webp, */*;q=0.8\x00\x00\x00$Accept-Encoding: gzip, deflate, sdch\x00\x00\x007Accept-Language: en-AU, en;q=0.8, en-US;q=0.6, en;q=0.4\x00\x00\x00\x14Cookie: sp=abcd-1234\x00\x00\x00'Referer: http://snowflake-analytics.com\x00\x00\x00zUser-Agent:  Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36\x00\x00\x00\x1aX-Forwarded-For: 127.0.0.1\x00\x00\x00\x15X-Forwarded-Port: 443\x00\x00\x00\x18X-Forwarded-Proto: https\x00\x00\x00\x16Connection: keep-alive\x00"
```

You’ll see that some fields are recognisable here. We can make out a query string and some headers but there’s a lot of data in between that makes this a bit difficult to read and parse. This is our binary serialized Thrift record that we’ll deserialize next.

```
collector = thriftpy.load("collector-payload.thrift")
collector_payload = collector.CollectorPayload()
raw_payload = deserialize(collector_payload, decoded_payload, TCyBinaryProtocolFactory())
```

In the cell above we’re doing quite a bit. First we’re loading the Snowplow provided .thrift file which acts as a specification for both serializing and deserializing the data. Next we’re initialising a structure based on the CollectorPayload struct and finally we are deserializing our base64 decoded object providing the class, base64 decoded payload and protocol factory to deserialize the object.

```
print(raw_payload)

CollectorPayload(querystring='stm=1481153329000&e=pv&url=http%3A%2F%2Fsnowflake-analytics.com&tv=js-2.6.0&tna=js-3.6.0&aid=snowflake&p=web&tz=Australia%2FSydney&lang=en-AU&cs=UTF-8&res=360x640&cd=32&cookie=1&eid=c259c25e-f94b-4d2c-a11c-0d278c2e6d1a&dtm=1479927857201&vp=0x-56&ds=200x26295&vid=4&sid=7fb97fC6-6e0f-4022-adbd-017431520ddb&duid=4d10d3d0-c2b4-473e-a483-812799e824d1&fp=129112332', collector='ssc-0.7.0-kinesis', ipAddress='127.0.0.1', timestamp=1481153329000, path='/i', contentType=None, refererUri='https://snowflake-analytics.com', schema='iglu:com.snowplowanalytics.snowplow/CollectorPayload/thrift/1-0-0', encoding='UTF-8', hostname='collector.snowflake-analytics.com', userAgent='Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36', body=None, headers=['Host: collector.snowflake-analytics.com', 'Accept: image/webp, */*;q=0.8', 'Accept-Encoding: gzip, deflate, sdch', 'Accept-Language: en-AU, en;q=0.8, en-US;q=0.6, en;q=0.4', 'Cookie: sp=abcd-1234', 'Referer: http://snowflake-analytics.com', 'User-Agent:  Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36', 'X-Forwarded-For: 127.0.0.1', 'X-Forwarded-Port: 443', 'X-Forwarded-Proto: https', 'Connection: keep-alive'], networkUserId='4d10d3d0-c2b4-473e-a483-812799e824d1')
```

Excellent! That’s looking a lot more readable already. If you haven’t already noticed, the properties of our CollectorPayload class match the fields defined in our collector-payload.thrift record. Let’s access some of them directly.

```
querystring = raw_payload.querystring
network_userid = raw_payload.networkUserId
print(querystring)

stm=1481153329000&e=pv&url=http%3A%2F%2Fsnowflake-analytics.com&tv=js-2.6.0&tna=js-3.6.0&aid=snowflake&p=web&tz=Australia%2FSydney&lang=en-AU&cs=UTF-8&res=360x640&cd=32&cookie=1&eid=c259c25e-f94b-4d2c-a11c-0d278c2e6d1a&dtm=1479927857201&vp=0x-56&ds=200x26295&vid=4&sid=7fb97fC6-6e0f-4022-adbd-017431520ddb&duid=4d10d3d0-c2b4-473e-a483-812799e824d1&fp=129112332
```

We can now access these properties directly but at this stage we’ve just got the raw querystring - you’ll recognise this as the network request that is sent to the collector when using the Snowplow Javascript library (tna=js-3.6.0). Let’s split this out so we can look at the individual key value pairs that are in the payload.

```
from urllib import parse
params = parse.parse_qs(querystring)
print(params)

{'aid': ['snowflake'],
 'cd': ['32'],
 'cookie': ['1'],
 'cs': ['UTF-8'],
 'ds': ['200x26295'],
 'dtm': ['1479927857201'],
 'duid': ['4d10d3d0-c2b4-473e-a483-812799e824d1'],
 'e': ['pv'],
 'eid': ['c259c25e-f94b-4d2c-a11c-0d278c2e6d1a'],
 'fp': ['129112332'],
 'lang': ['en-AU'],
 'p': ['web'],
 'res': ['360x640'],
 'sid': ['7fb97fC6-6e0f-4022-adbd-017431520ddb'],
 'stm': ['1481153329000'],
 'tna': ['js-3.6.0'],
 'tv': ['js-2.6.0'],
 'tz': ['Australia/Sydney'],
 'url': ['http://snowflake-analytics.com'],
 'vid': ['4'],
 'vp': ['0x-56']}
```

If you’re familiar with Python you’ll note that our `parse_qs` function returns a dictionary containing values in the form of a list. We can access this reasonably easy by - in this case let’s extract out the `app_id` for the event.

```
app_id = params.get('aid')[0]
print(app_id)

snowflake
```

In the above sample we’re using the built in get method (on a dictionary) to access the `aid` property rather than `app_id` you can find a list of the mappings from the URL parameter to the friendly name here. The `[0]` above access the first element in that list for the aid key. In our example each of these lists only contains one value so we don’t need to worry about addressing additional values.

That concludes this tutorial. Please post below if you’ve got queries or parts of the post require additional clarification - this is a quite involved process.

In our next tutorial we’ll cover how we can leverage this simple process of decoding a single bad row - to multiple bad rows from a run and looping this data back into Redshift so we can query it!

[hampden]: https://github.com/jekyll/jekyll
