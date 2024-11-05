// src/components/CharacterPreview.jsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { User, Heart, Activity, Star, Calendar, Frame } from 'lucide-react';

const CharacterPreview = ({ data }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>معاينة الشخصية</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <User className="h-4 w-4" />
            المعلومات الأساسية
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>الاسم: {data.basic.name || 'غير محدد'}</div>
            <div>العمر: {data.basic.age || 'غير محدد'}</div>
            <div>المكان: {data.basic.location || 'غير محدد'}</div>
          </div>
        </div>

        {/* Values */}
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Heart className="h-4 w-4" />
            القيم الأساسية
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.values.map((value, index) => (
              value && (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {value}
                </span>
              )
            ))}
          </div>
        </div>

        {/* Traits */}
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Activity className="h-4 w-4" />
            الصفات
          </h3>
          <div className="space-y-2">
            {data.traits.map((trait, index) => (
              trait.trait && (
                <div key={index} className="border rounded-lg p-3 space-y-1">
                  <div className="font-medium">{trait.trait}</div>
                  {trait.importance && (
                    <div className="text-sm text-muted-foreground">{trait.importance}</div>
                  )}
                </div>
              )
            ))}
          </div>
        </div>

        {/* Routines */}
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            الروتين اليومي
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="font-medium">روتين الصباح</div>
              <div className="text-sm">{data.routines.wakeTime && `الاستيقاظ: ${data.routines.wakeTime}`}</div>
              <div className="space-y-1">
                {data.routines.morningRoutine.map((item, index) => (
                  item && (
                    <div key={index} className="text-sm">• {item}</div>
                  )
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-medium">روتين المساء</div>
              <div className="text-sm">{data.routines.bedTime && `النوم: ${data.routines.bedTime}`}</div>
              <div className="space-y-1">
                {data.routines.eveningRoutine.map((item, index) => (
                  item && (
                    <div key={index} className="text-sm">• {item}</div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Support Tools */}
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Frame className="h-4 w-4" />
            أدوات الدعم
          </h3>
          <div className="grid gap-2 text-sm">
            {data.supportTools.comfortItems && (
              <div>
                <span className="font-medium">أغراض مريحة:</span> {data.supportTools.comfortItems}
              </div>
            )}
            {data.supportTools.calmingMusic && (
              <div>
                <span className="font-medium">موسيقى مهدئة:</span> {data.supportTools.calmingMusic}
              </div>
            )}
            {data.supportTools.safePlaces && (
              <div>
                <span className="font-medium">أماكن آمنة:</span> {data.supportTools.safePlaces}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterPreview;